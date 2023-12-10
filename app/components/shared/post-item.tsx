import { type Prisma } from "@prisma/client"
import { Link } from "@remix-run/react"

import { ImageCover } from "~/components/shared/image-cover"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { ButtonLink } from "~/components/ui/button-link"
import { type modelPost } from "~/models/post.server"
import { formatPublished } from "~/utils/datetime"

export function PostItem({
  post,
}: {
  post: Prisma.PromiseReturnType<typeof modelPost.getBySlug>
}) {
  if (!post) return null

  return (
    <div className="flex justify-between gap-4">
      <div className="basis-3/5 space-y-2">
        <Link
          to={`/${post.user.username}`}
          className="focus-ring flex items-center gap-2 transition hover:opacity-75"
        >
          <AvatarAuto
            user={post.user}
            imageUrl={post.user.images[0]?.url}
            size="xs"
          />
          <span className="text-sm font-semibold">{post.user.fullname}</span>
        </Link>

        <div>
          <h3>
            <Link
              to={`/posts/${post.slug}`}
              className="focus-ring transition hover:text-primary"
            >
              {post.title}
            </Link>
          </h3>

          <p className="hidden sm:block">{post.excerpt}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          <time>{formatPublished(post.updatedAt)}</time>
        </p>

        <ButtonLink variant="secondary" size="sm" to={`/posts/${post.slug}`}>
          Read Post
        </ButtonLink>
      </div>

      <Link
        className="focus-ring block basis-2/5 transition hover:opacity-75"
        to={`/posts/${post.slug}`}
      >
        <ImageCover src={post.images[0]?.url} />
      </Link>
    </div>
  )
}
