import type { Context } from "hono";
import { prisma } from "../lib/prisma";


export const getUsers = async (c: Context) => {
  try {
    const data = await prisma(c).user.findMany()
    if (data.length === 0) {
      return c.json({
        message: "No users found"
      }, 404)
    }
    return c.json(data, 200)
  } catch (error) {
    return c.json({
      error,
      message: 'Something went wrong'
    }, 500)
  }
}