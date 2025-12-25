// scripts/db-new.ts
import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function nextMigrationNumber(dir: string) {
  if (!existsSync(dir)) return 1;
  const files = readdirSync(dir);
  const nums = files
    .map((f) => {
      const m = /^(\d{4})_.*\.sql$/.exec(f);
      return m ? Number(m[1]) : null;
    })
    .filter((n): n is number => n !== null);

  return (nums.length ? Math.max(...nums) : 0) + 1;
}

function runPrismaDiff(args: string[]) {
  const proc = Bun.spawnSync(["bunx", "prisma", ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });

  const stdout = new TextDecoder().decode(proc.stdout);
  const stderr = new TextDecoder().decode(proc.stderr);

  if (proc.exitCode !== 0) {
    console.error(stderr || stdout);
    process.exit(proc.exitCode);
  }

  return stdout;
}

const nameArg = process.argv.slice(2).join(" ").trim();

if (!nameArg) {
  console.log("Usage: bun run db:new <name>");
  console.log('Example: bun run db:new "add products"');
  process.exit(1);
}

const migrationsDir = "migrations";
if (!existsSync(migrationsDir)) mkdirSync(migrationsDir, { recursive: true });

const slug = slugify(nameArg);
if (!slug) {
  console.error("Invalid migration name.");
  process.exit(1);
}

const n = nextMigrationNumber(migrationsDir);
const filename = `${String(n).padStart(4, "0")}_${slug}.sql`;
const filepath = join(migrationsDir, filename);

// If first migration, diff from empty; otherwise diff from existing migrations folder
const hasAnyMigration = readdirSync(migrationsDir).some((f) => f.endsWith(".sql"));

const diffArgs = hasAnyMigration
  ? [
      "migrate",
      "diff",
      "--from-migrations",
      migrationsDir,
      "--to-schema",
      "prisma/schema.prisma",
      "--script",
    ]
  : [
      "migrate",
      "diff",
      "--from-empty",
      "--to-schema",
      "prisma/schema.prisma",
      "--script",
    ];

const sql = runPrismaDiff(diffArgs).trim();

// Kalau nggak ada perubahan, jangan bikin file kosong
if (!sql || /^--\s*No\s+changes/i.test(sql)) {
  console.log("No schema changes detected. Migration not created.");
  process.exit(0);
}

writeFileSync(filepath, sql + "\n", "utf8");
console.log(`✅ Created migration: ${filepath}`);
console.log(`👉 Next: bun run db:apply`);
