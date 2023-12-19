import { formatTimestamp } from "~/utils/datetime"

export function Timestamp({
  className,
  isUpdated,
  createdAt,
  updatedAt,
}: React.HTMLAttributes<HTMLParagraphElement> & {
  isUpdated: boolean
  createdAt: string
  updatedAt: string
}) {
  return (
    <>
      {!isUpdated && (
        <p className={className}>
          Created <time>{formatTimestamp(createdAt)}</time>
        </p>
      )}
      {isUpdated && (
        <p className={className}>
          Updated <time>{formatTimestamp(updatedAt)}</time>
        </p>
      )}
    </>
  )
}
