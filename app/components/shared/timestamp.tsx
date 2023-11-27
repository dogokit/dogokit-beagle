import { formatTimestamp } from "~/utils/datetime"

export function Timestamp({
  isUpdated,
  createdAt,
  updatedAt,
}: {
  isUpdated: boolean
  createdAt: string
  updatedAt: string
}) {
  return (
    <>
      {!isUpdated && (
        <p>
          Created <time>{formatTimestamp(createdAt)}</time>
        </p>
      )}
      {isUpdated && (
        <p>
          Updated <time>{formatTimestamp(updatedAt)}</time>
        </p>
      )}
    </>
  )
}
