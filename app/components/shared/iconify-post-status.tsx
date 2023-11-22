import { type PostStatus } from "@prisma/client"
import { match } from "ts-pattern"

import { Iconify } from "~/components/ui/iconify"

export const getPostStatusIconName = (providerName: string) =>
  match(providerName)
    .with("DRAFT", () => "ph:notebook-fill")
    .with("PRIVATE", () => "ph:book-fill")
    .with("UNLISTED", () => "ph:book-bookmark-fill")
    .with("PUBLISHED", () => "ph:book-open-text-fill")
    .with("ARCHIVED", () => "ph:books-fill")
    .otherwise(() => "ph:square-fill")

export function IconifyPostStatus({
  status,
}: {
  status: Pick<PostStatus, "symbol">
}) {
  return (
    <Iconify className="inline" icon={getPostStatusIconName(status.symbol)} />
  )
}
