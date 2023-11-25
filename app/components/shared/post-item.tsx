import { type Prisma } from "@prisma/client"
import { Link } from "@remix-run/react"

import { type modelPost } from "~/models/post.server"

export function PostItem({
  post,
}: {
  post: Prisma.PromiseReturnType<typeof modelPost.getWithStatus>
}) {
  if (!post) return null
  return (
    <div className="space-y-1 py-2 transition hover:opacity-75">
      <h4>{post.title}</h4>
      <p>{post.content}</p>
    </div>
  )
}

export function PostItemLink({
  post,
}: {
  post: Prisma.PromiseReturnType<typeof modelPost.getWithStatus>
}) {
  if (!post) return null
  return (
    <li>
      <Link
        to={`/posts/${post.slug}`}
        className="block space-y-1 transition hover:opacity-75"
      >
        <PostItem post={post as any} />
      </Link>
    </li>
  )
}
