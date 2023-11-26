import { prisma } from "~/libs/db.server"
import { logEnv } from "~/utils/log.server"

async function checkData() {
  logEnv()

  console.info("🔑 Count permissions", await prisma.permission.count())
  console.info("👑 Count roles", await prisma.role.count())
  console.info("👤 Count users", await prisma.user.count())
  console.info("🪧 Count post statuses", await prisma.postStatus.count())
  console.info("📜 Count posts", await prisma.post.count())
}

checkData()
