import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  // Ini hanya buat tooling Prisma (generate / migrate local)
  // Runtime Workers tetap pakai adapter D1
  datasource: {
    url: 'file:./dev.db'
  }
})
