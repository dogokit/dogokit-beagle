import { prisma } from "~/libs/db.server"
import { parsedEnv } from "~/utils/env.server"
import { logEnv } from "~/utils/log.server"

async function checkEnv() {
  logEnv()

  try {
    await prisma.$queryRaw`SELECT 1`
    console.info(`🟢 ${parsedEnv.NODE_ENV} database is running`)
  } catch (error) {
    console.error(`🔴 ${parsedEnv.NODE_ENV} database is not running`)
  }
}

checkEnv()
