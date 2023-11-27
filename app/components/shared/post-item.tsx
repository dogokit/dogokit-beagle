import { type Prisma } from "@prisma/client"
import { Link } from "@remix-run/react"
import parseHTML from "html-react-parser"

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
    <div className="space-y-2 py-2 transition hover:opacity-75">
      <div className="flex items-center gap-2">
        <AvatarAuto
          user={post.user}
          imageUrl={post.user.images[0]?.url}
          size="xs"
        />
        <span className="text-sm">{post.user.fullname}</span>
      </div>

      <div>
        <h4>{post.title}</h4>
        <div>{parseHTML(post.content)}</div>
      </div>

      <div className="text-muted-foreground">
        <p className="text-sm">
          <TimePublished>{post.updatedAt}</TimePublished>
        </p>
      </div>
    </div>
  )
}

export function PostItemLink({
  post,
}: {
  post: Prisma.PromiseReturnType<typeof modelPost.getBySlug>
}) {
  if (!post) return null
  return (
    <li>
      <Link
        to={`/posts/${post.slug}`}
        className="focus-ring block space-y-1 rounded-md transition hover:opacity-75"
      >
        <PostItem post={post} />
      </Link>
    </li>
  )
}
