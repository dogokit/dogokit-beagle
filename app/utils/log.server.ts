import util from "util"

import { parsedEnv } from "~/utils/env.server"

export function logServer(code: unknown, isShown = true) {
  if (parsedEnv.NODE_ENV !== "development" || isShown !== true) return null
  console.info(util.inspect(code, false, null, true))
}

export function logEnv() {
  const { NODE_ENV, APP_URL, DATABASE_URL, DATABASE_BRANCH } = parsedEnv

  console.info("🐶 Dogokit Remix")
  console.info("💬 NODE_ENV:", NODE_ENV)
  console.info("💬 APP_URL:", APP_URL)
  console.info("💬 DATABASE_URL:", DATABASE_URL)
  if (DATABASE_BRANCH) console.info("💬 DATABASE_BRANCH:", DATABASE_BRANCH)
}
