import { prisma } from "~/libs/db.server"
import { logEnv, logServer } from "~/utils/log.server"

async function checkData() {
  logEnv()

  const users = await prisma.user.findMany()
  logServer({ users })
}

checkData()
