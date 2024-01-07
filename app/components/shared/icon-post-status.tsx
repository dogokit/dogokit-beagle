import { type PostStatus } from "@prisma/client"

import { IconMatch } from "~/components/libs/icon"

export function IconPostStatus({ status }: { status: Pick<PostStatus, "symbol"> }) {
  return <IconMatch icon={status.symbol} className="inline" />
}
