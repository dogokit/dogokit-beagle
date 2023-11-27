import { type Post } from "@prisma/client"
import { Link } from "@remix-run/react"
import parseHTML from "html-react-parser"

import { getTruncatedText } from "~/utils/string"

export function PostItem({ post }: { post: Post }) {
  if (!post) return null
  return (
    <div className="space-y-1 py-2 transition hover:opacity-75">
      <h4>{post.title}</h4>
      <p className="text-muted-foreground">
        {parseHTML(getTruncatedText(post.content))}
      </p>
    </div>
  )
}

export function PostItemLink({ post }: { post: Post }) {
  if (!post) return null
  return (
    <li>
      <Link
        to={`/posts/${post.slug}`}
        className="block space-y-1 transition hover:opacity-75"
      >
        <PostItem post={post} />
      </Link>
    </li>
  )
}
