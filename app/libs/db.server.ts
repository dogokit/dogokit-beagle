import { PrismaClient } from "@prisma/client"

import { remember } from "~/utils/remember"

let prisma = remember("prisma", () => new PrismaClient())

declare global {
  var __db__: PrismaClient | undefined
}

if (!global.__db__) {
  global.__db__ = remember("prisma", () => new PrismaClient())
}
prisma = global.__db__
prisma.$connect()

export { prisma }
