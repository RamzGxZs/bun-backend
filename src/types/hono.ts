import type { PrismaClient } from '@prisma/client'

export type Bindings = {
  DB: D1Database
}

export type Variables = {
  prisma: PrismaClient
}
