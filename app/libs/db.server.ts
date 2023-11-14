import { PrismaClient } from "@prisma/client"

import { parsedEnv } from "~/utils/env.server"
import { remember } from "~/utils/remember"

let prisma = remember("prisma", () => new PrismaClient())

declare global {
  var __db__: PrismaClient | undefined
}

if (parsedEnv.NODE_ENV === "production") {
  prisma = remember("prisma", () => new PrismaClient())
} else {
  if (!global.__db__) {
    global.__db__ = remember("prisma", () => new PrismaClient())
  }
  prisma = global.__db__
  prisma.$connect()
}

export { prisma }
