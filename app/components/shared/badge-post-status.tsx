import { type PostStatus } from "@prisma/client"

import { IconifyPostStatus } from "~/components/shared/iconify-post-status"
import { Badge, type BadgeProps } from "~/components/ui/badge"
import { cn } from "~/utils/cn"

export function BadgePostStatus({
  status,
  className,
}: BadgeProps & {
  status: Pick<PostStatus, "symbol" | "name">
}) {
  return (
    <Badge
      variant="secondary"
      className={cn("inline-flex items-center gap-1", className)}
    >
      <IconifyPostStatus status={status} />
      <span>{status.name}</span>
    </Badge>
  )
}
