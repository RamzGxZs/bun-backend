import type { Context } from "hono";


export const getUsers = async (c: Context) => {
  return c.json({
    status: 'ok',
    path: '/user/get',
    timestamp: new Date()
  })
}