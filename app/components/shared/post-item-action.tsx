import { IconMatch } from "~/components/libs/icon"
import { FormDelete } from "~/components/shared/form-delete"
import { FormUpdateStatus } from "~/components/shared/form-update-status"
import { ButtonLink } from "~/components/ui/button-link"
import { useAppUserLoaderData } from "~/hooks/use-app-loader-data"
import { type modelPost } from "~/models/post.server"
import { type JsonifyPrisma } from "~/types/jsonify"
import { cn } from "~/utils/cn"
import { truncateText } from "~/utils/string"

export function PostItemAction({ post }: { post: JsonifyPrisma<typeof modelPost.getWithStatus> }) {
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
        <div className={cn("flex flex-col gap-1", "lg:flex-row-reverse lg:items-center")}>
          <h4>{truncateText(post.title)}</h4>

          <div className="space-x-1">
            <ButtonLink to={`/user/posts/${post.id}`} prefetch="intent" variant="outline" size="xs">
              <IconMatch icon="note-pencil" />
              <span>Edit</span>
            </ButtonLink>
            <FormDelete
              action="/user/posts/delete"
              intentValue="user-delete-post-by-id"
              itemText={`a post: ${post.title} (${post.slug})`}
              defaultValue={post.id}
            />
            <ButtonLink
              to={`/posts/${post.slug}`}
              prefetch="intent"
              variant="outline"
              size="xs"
              disabled={isViewDisabled}
            >
              <IconMatch icon="arrow-square-out" />
              <span>View</span>
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 lg:flex-row-reverse">
        <FormUpdateStatus
          itemId="postId"
          action="/user/posts/update"
          intentValue="update-post-status"
          dialogTitle="Update post's status"
          dialogDescription={`Update the status of post: ${post.title} (${post.slug})`}
          dialogAction="Update Status"
          itemStatuses={postStatuses}
          item={post}
        />

        <code className="hidden text-xs text-muted-foreground lg:inline-flex">{post.slug}</code>
      </div>
    </li>
  )
}
