import { PrismaClient } from "@prisma/client"
import chalk from "chalk"

import { remember } from "~/utils/remember"

// LATER: Use PlanetScale adapter when it's ready
// const connectionString = parsedEnv.DATABASE_URL
// const client = new Client({ url: connectionString })
// const adapter = new PrismaPlanetScale(client)

export const prisma = remember("prisma", () => {
  /**
   * If there're some changes, need to restart the dev server
   */

  const client = new PrismaClient({
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "stdout" },
      { level: "warn", emit: "stdout" },
    ],
  })

  // Only to detect a long processed query
  const LOG_THRESHOLD = 20 // time in ms

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

    console.info(`💎 Prisma: ${dur}: ${event.query}`)
  })

  client.$connect()

  return client
})
