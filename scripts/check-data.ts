import { prisma } from "~/libs/db.server"
import { logEnv } from "~/utils/log.server"

async function checkData() {
  logEnv()

  const users = await prisma.user.findMany({
    select: { id: true, email: true, username: true },
  })
  console.info({ users })
}

checkData()
