import {
  formatPublished,
  formatTimestamp,
  type ParamDate,
} from "~/utils/datetime"

export function Timestamp({ children }: { children: ParamDate }) {
  return <time>{formatTimestamp(children)}</time>
}

export function TimePublished({ children }: { children: ParamDate }) {
  return <time>{formatPublished(children)}</time>
}
