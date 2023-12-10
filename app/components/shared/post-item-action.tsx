import { type Prisma } from "@prisma/client"
import { FormChangeStatus } from "~/components/shared/form-change-status"
import { FormDelete } from "~/components/shared/form-delete"

import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { useAppUserLoaderData } from "~/hooks/use-app-loader-data"
import { type modelPost } from "~/models/post.server"
import { cn } from "~/utils/cn"
import { truncateText } from "~/utils/string"

export function PostItemAction({
  post,
}: {
  post: Prisma.PromiseReturnType<typeof modelPost.getWithStatus>
}) {
  const { postStatuses } = useAppUserLoaderData()
  if (!post) return null

  // Only can View post if PRIVATE, UNLISTED, PUBLISHED, ARCHIVED
  const isViewDisabled = post.status.symbol === "DRAFT"

  return (
    <li
      key={post.id}
      className={cn(
        "flex flex-col flex-wrap items-start justify-between gap-1 py-2",
        "sm:flex-row",
        "lg:items-center lg:gap-2",
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex flex-col gap-1",
            "lg:flex-row-reverse lg:items-center",
          )}
        >
          <h4>{truncateText(post.title)}</h4>

          <div className="space-x-1">
            <ButtonLink
              variant="outline"
              size="xs"
              to={`/user/posts/${post.id}`}
            >
              <Iconify icon="ph:note-pencil" />
              <span>Edit</span>
            </ButtonLink>
            <FormDelete
              action="/user/posts/delete"
              intentValue="user-delete-post-by-id"
              itemText={`a post: ${post.title} (${post.slug})`}
              defaultValue={post.id}
              requireUser
              userId={post.userId}
            />
            <ButtonLink
              variant="outline"
              size="xs"
              to={`/posts/${post.slug}`}
              disabled={isViewDisabled}
            >
              <Iconify icon="ph:arrow-square-out-duotone" />
              <span>View</span>
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 lg:flex-row-reverse">
        <FormChangeStatus
          itemId="postId"
          action="/user/posts/patch"
          intentValue="change-post-status"
          dialogTitle="Change post's status"
          dialogDescription={`Change the status of post: ${post.title} (${post.slug})`}
          itemStatuses={postStatuses}
          item={post}
        />

        <code className="hidden text-xs text-muted-foreground lg:inline-flex">
          {post.slug}
        </code>
      </div>
    </li>
  )
}
