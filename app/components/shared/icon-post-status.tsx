import { type PostStatus } from "@prisma/client"

import { IconMatch } from "~/components/libs/icon"

export function IconPostStatus({ status }: { status: Pick<PostStatus, "symbol"> }) {
  return (
    <span className="inline">
      <IconMatch icon={status.symbol} />
    </span>
  )
}
