import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime.js"

dayjs.extend(relativeTime)

type ParamDate = string | Date | undefined

/**
 * Example formats:
 *
 * D MMM YYY
 * H:mm:ss Z
 */

export function getCurrentYear() {
  return new Date().getFullYear()
}

export function formatTimestamp(date: ParamDate) {
  return (
    dayjs(date).locale("en").format("MMM D, YYYY [at] H:mm") +
    ` · ${formatRelativeTime(date)}`
  )
}

export function formatDate(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("D MMM YYYY")
}

export function formatDateLastMod(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("YYYY-MM-DD")
}

export function formatPublished(date: string | Date | undefined) {
  return dayjs(date).locale("en").format("MMMM D, YYYY")
}

/**
 * Relative time
 */

function formatRelativeTime(date: string | Date | undefined) {
  return dayjs(date).locale("en").fromNow()
}

/**
 * Converter
 */

export function convertDaysToSeconds(days: number) {
  // seconds * minutes * hours * days
  return 60 * 60 * 24 * days
}
