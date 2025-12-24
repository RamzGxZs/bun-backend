import type { Context } from 'hono'

export const healthCheck = (c: Context) => {
  return c.json({
    status: 'ok',
    runtime: 'bun',
    framework: 'hono',
    timestamp: new Date().toISOString(),
  })
}
