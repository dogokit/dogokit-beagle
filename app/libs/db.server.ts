import { PrismaClient } from "@prisma/client"

import { parsedEnv } from "~/utils/env.server"

let prisma: PrismaClient

declare global {
  var __db__: PrismaClient | undefined
}

/**
 * This is needed because in development we don't want to restart
 * the server with every change, but we want to make sure we don't
 * create a new connection to the DB with every change either.
 * In production, we'll have a single connection to the DB.
 */
if (parsedEnv.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient()
  }
  prisma = global.__db__
  prisma.$connect()
}

export { prisma }
