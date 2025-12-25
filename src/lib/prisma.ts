import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'
import type { Context } from 'hono'
import type { Bindings, Variables } from '../types/hono'

export const prismaFromD1 = (db: D1Database) => {
  const adapter = new PrismaD1(db)
  return new PrismaClient({ adapter })
}


type AppContext = Context<{ Bindings: Bindings; Variables: Variables }>
const KEY = Symbol.for('prisma')

export function prisma(c: AppContext): PrismaClient {
  const cached = c.get('prisma')
  if (cached) return cached

  const client = prismaFromD1(c.env.DB)
  c.set('prisma', client)
  return client
}


