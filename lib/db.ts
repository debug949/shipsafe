import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "./generated/prisma/client"

function createPrismaClient() {
  const url = process.env.DATABASE_URL
  if (!url) return null

  const pool = new Pool({ connectionString: url })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ adapter } as never)
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | null }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
