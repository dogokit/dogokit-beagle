import { type Prisma } from "@prisma/client"
import { FormChangeStatus } from "~/components/shared/form-change-status"
import { FormDelete } from "~/components/shared/form-delete"

import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { useAppUserLoaderData } from "~/hooks/use-app-loader-data"
import { type modelPost } from "~/models/post.server"
import { cn } from "~/utils/cn"

export function PostListItem({
  post,
}: {
  post: Prisma.PromiseReturnType<typeof modelPost.getWithStatus>
}) {
  const { postStatuses } = useAppUserLoaderData()
  if (!post) return null

  // Only can View post if PRIVATE, UNLISTED, PUBLISHED, ARCHIVED
  const isDisabled = post.status.symbol === "DRAFT"

  return (
    <li
      key={post.id}
      className={cn(
        "py-2",
        "flex flex-col flex-wrap gap-1",
        "lg:flex-row lg:items-center lg:justify-between lg:gap-2",
      )}
    >
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1">
          <ButtonLink variant="outline" size="xs" to={`/user/posts/${post.id}`}>
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
            disabled={isDisabled}
          >
            <Iconify icon="ph:arrow-square-out-duotone" />
            <span>View</span>
          </ButtonLink>
        </div>
        <h4>{post.title}</h4>
      </div>

      <div className="flex flex-row-reverse items-center gap-2 sm:flex-row">
        <code className="text-xs text-muted-foreground">{post.slug}</code>

        <FormChangeStatus
          itemId="postId"
          action="/user/posts/patch"
          intentValue="change-post-status"
          dialogTitle="Change post's status"
          dialogDescription={`Change the status of post: ${post.title} (${post.slug})`}
          itemStatuses={postStatuses}
          item={post}
        />
      </div>
    </li>
  )
}
