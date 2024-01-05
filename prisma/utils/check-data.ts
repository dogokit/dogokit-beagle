import { db } from "~/libs/db.server"
import { logEnv } from "~/utils/log.server"

async function checkData() {
  logEnv()

  console.info("🔑 Count permissions", await db.permission.count())
  console.info("👑 Count roles", await db.role.count())
  console.info("👤 Count users", await db.user.count())
  console.info("📃 Count page statuses", await db.pageStatus.count())
  console.info("📃 Count pages", await db.page.count())
  console.info("🪧 Count post statuses", await db.postStatus.count())
  console.info("🪧 Count posts", await db.post.count())
}

checkData()
