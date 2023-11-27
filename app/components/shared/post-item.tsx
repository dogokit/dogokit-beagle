import { type Prisma } from "@prisma/client"
import { Link } from "@remix-run/react"

import { AvatarAuto } from "~/components/ui/avatar-auto"
import { type modelPost } from "~/models/post.server"
import { cn } from "~/utils/cn"
import { formatPublished } from "~/utils/datetime"

export function PostItem({
  post,
}: {
  post: Prisma.PromiseReturnType<typeof modelPost.getBySlug>
}) {
  if (!post) return null

  return (
    <div className="flex justify-between gap-4">
      <div className="basis-3/4 space-y-2">
        <Link
          to={`/${post.user.username}`}
          className="focus-ring flex items-center gap-2 transition hover:opacity-75"
        >
          <AvatarAuto
            user={post.user}
            imageUrl={post.user.images[0]?.url}
            size="xs"
          />
          <span className="text-xs font-semibold">{post.user.fullname}</span>
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

          <p className="hidden sm:block">{post.content}</p>
        </div>

        <p className="text-sm text-muted-foreground">
          <time>{formatPublished(post.updatedAt)}</time>
        </p>
      </div>

      <Link
        className="focus-ring block basis-1/4 transition hover:opacity-75"
        to={`/posts/${post.slug}`}
      >
        <PostItemImage src={post.images[0]?.url} />
      </Link>
    </div>
  )
}

export function PostItemImage({
  src,
  alt,
  className,
  width = 200,
  height = 150,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const sourceWidth = Number(width) * 2
  const sourceHeight = Number(height) * 2
  const placeholder = `https://picsum.photos/${sourceWidth}/${sourceHeight}`

  return (
    <img
      src={src || placeholder}
      alt={alt}
      className={cn("select-none rounded-md object-cover", className)}
      width={width}
      height={height}
      {...props}
    />
  )
}
