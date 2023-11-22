import { type PostStatus } from "@prisma/client"

import { IconifyPostStatus } from "~/components/shared/iconify-post-status"
import { Badge } from "~/components/ui/badge"

export function BadgePostStatus({
  status,
}: {
  status: Pick<PostStatus, "symbol" | "name">
}) {
  return (
    <Badge
      variant="secondary"
      className="flex cursor-pointer items-center gap-1"
    >
      <IconifyPostStatus status={status} />
      <span>{status.name}</span>
    </Badge>
  )
}
