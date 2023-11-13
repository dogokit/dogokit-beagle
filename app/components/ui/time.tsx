import { formatTimestamp, type ParamDate } from "~/utils/datetime"

export function Time({ children }: { children: ParamDate }) {
  return <time>{formatTimestamp(children)}</time>
}
