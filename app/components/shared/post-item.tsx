import { type Prisma } from "@prisma/client"
import { Link } from "@remix-run/react"

import { AvatarAuto } from "~/components/ui/avatar-auto"
import { TimePublished } from "~/components/ui/time"
import { type modelPost } from "~/models/post.server"

export function PostItem({
  post,
}: {
  post: Prisma.PromiseReturnType<typeof modelPost.getBySlug>
}) {
  if (!post) return null

  return (
    <div className="space-y-2 py-2">
      <Link
        to={`/${post.user.username}`}
        className="focus-ring flex items-center gap-2 transition hover:opacity-75"
      >
        <AvatarAuto
          user={post.user}
          imageUrl={post.user.images[0]?.url}
          size="xs"
        />
        <span className="text-sm">{post.user.fullname}</span>
      </Link>

      <div>
        <h4>
          <Link
            to={`/posts/${post.slug}`}
            className="focus-ring transition hover:text-primary"
          >
            {post.title}
          </Link>
        </h4>

        <p>{post.content}</p>
      </div>

      <div className="text-muted-foreground">
        <p className="text-sm">
          <TimePublished>{post.updatedAt}</TimePublished>
        </p>
      </div>
    </div>
  )
}
