import { z } from 'zod'
import type { Context } from 'hono'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  APP_NAME: z.string().default('bun-backend')
})

export type Env = z.infer<typeof envSchema>

export function getEnv(c: Context): Env {
  return envSchema.parse((c as any).env)
}
