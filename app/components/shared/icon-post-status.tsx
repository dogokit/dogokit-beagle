import { type PostStatus } from "@prisma/client"
import { match } from "ts-pattern"

import { Iconify } from "~/components/ui/iconify"

const getIconName = (symbol: string) =>
  match(symbol)
    .with("DRAFT", () => "ph:notebook-fill")
    .with("PRIVATE", () => "ph:book-fill")
    .with("UNLISTED", () => "ph:book-bookmark-fill")
    .with("PUBLISHED", () => "ph:book-open-text-fill")
    .with("ARCHIVED", () => "ph:books-fill")
    .otherwise(() => "simple-line-icons:question")

export function IconPostStatus({
  status,
}: {
  status: Pick<PostStatus, "symbol">
}) {
  return <Iconify className="inline" icon={getIconName(status.symbol)} />
}
