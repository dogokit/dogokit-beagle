import { type PostStatus } from "@prisma/client"
import { match } from "ts-pattern"

import { Badge } from "~/components/ui/badge"
import { Iconify } from "~/components/ui/iconify"

const getIconName = (providerName: string) =>
  match(providerName)
    .with("DRAFT", () => "ph:notebook-fill")
    .with("PRIVATE", () => "ph:book-fill")
    .with("UNLISTED", () => "ph:book-bookmark-fill")
    .with("PUBLISHED", () => "ph:book-open-text-fill")
    .with("ARCHIVED", () => "ph:books-fill")
    .otherwise(() => "ph:square-fill")

export function BadgeStatus({
  status,
}: {
  status: Pick<PostStatus, "symbol" | "name">
}) {
  return (
    <Badge variant="secondary" className="flex items-center gap-1">
      <Iconify icon={getIconName(status.symbol)} />
      <span>{status.name}</span>
    </Badge>
  )
}
