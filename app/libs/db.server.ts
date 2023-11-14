import { PrismaClient } from "@prisma/client"
import chalk from "chalk"

import { remember } from "~/utils/remember"

export const prisma = remember("prisma", () => {
  /**
   * If there're some changes, need to restart the dev server
   */

  const LOG_THRESHOLD = 20

  const client = new PrismaClient({
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "stdout" },
      { level: "warn", emit: "stdout" },
    ],
  })

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  client.$on("query", event => {
    if (event.duration < LOG_THRESHOLD) return

    const color =
      event.duration < LOG_THRESHOLD * 1.1
        ? "green"
        : event.duration < LOG_THRESHOLD * 1.2
        ? "blue"
        : event.duration < LOG_THRESHOLD * 1.3
        ? "yellow"
        : event.duration < LOG_THRESHOLD * 1.4
        ? "redBright"
        : "red"
    const dur = chalk[color](`${event.duration}ms`)

    console.info(`💎 Prisma | ${dur} | ${event.query}`)
  })

  client.$connect()

  return client
})
