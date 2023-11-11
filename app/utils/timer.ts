import { sleep } from "~/utils/sleep"

/**
 * Usage:
 * const timer = createTimer()
 * await timer.delay()
 */

export async function delay(ms = 500) {
  await sleep(ms)
}

export const createTimer = () => {
  const start = Date.now()

  return {
    delay: async (threshold = 1000) => {
      const currentDuration = Date.now() - start
      const delayDuration = Math.min(threshold - currentDuration, threshold)
      if (delayDuration > 0) await delay(delayDuration)
    },
  }
}
