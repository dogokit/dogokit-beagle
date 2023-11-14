import { Client } from "@planetscale/database"
import { PrismaPlanetScale } from "@prisma/adapter-planetscale"
import { PrismaClient } from "@prisma/client"
import { fetch as undiciFetch } from "undici"

import { parsedEnv } from "~/utils/env.server"
import { remember } from "~/utils/remember"

const connectionString = parsedEnv.DATABASE_URL

const client = new Client({ url: connectionString, fetch: undiciFetch })
const adapter = new PrismaPlanetScale(client)

let prisma = remember("prisma", () => new PrismaClient())

declare global {
  var __db__: PrismaClient | undefined
}

if (parsedEnv.NODE_ENV === "production") {
  prisma = remember("prisma", () => new PrismaClient({ adapter }))
} else {
  if (!global.__db__) {
    global.__db__ = remember("prisma", () => new PrismaClient())
  }
  prisma = global.__db__
  prisma.$connect()
}

export { prisma }
