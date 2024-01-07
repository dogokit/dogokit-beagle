import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node"
import { Link, useLoaderData, type Params } from "@remix-run/react"

import { IconMatch } from "~/components/libs/icon"
import { BadgePostStatus } from "~/components/shared/badge-post-status"
import { ErrorHelpInformation, GeneralErrorBoundary } from "~/components/shared/error-boundary"
import { FormUpdateStatus } from "~/components/shared/form-update-status"
import { ImageCover } from "~/components/shared/image-cover"
import { Timestamp } from "~/components/shared/timestamp"
import { ViewHTML } from "~/components/shared/view-html"
import { Alert } from "~/components/ui/alert"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { ButtonLink } from "~/components/ui/button-link"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { db } from "~/libs/db.server"
import { modelPostStatus } from "~/models/post-status.server"
import { modelPost } from "~/models/post.server"
import { formatDateDMY } from "~/utils/datetime"
import { invariant, invariantResponse } from "~/utils/invariant"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  const post = data?.post

  if (!post) {
    return createMeta({
      title: "Post not found",
      description: `Cannot find post with slug ${params.postSlug}`,
      canonicalPath: "/posts",
    })
  }
  return createMeta({
    title: post.title,
    description: post.excerpt,
    canonicalPath: `/posts/${post.slug}`,
  })
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.postSlug, "params.postSlug unavailable")

  const [post, postStatuses] = await db.$transaction([
    modelPost.getBySlug({ slug: params.postSlug }),
    modelPostStatus.getAll(),
  ])

  invariantResponse(post, "Post not found", { status: 404 })
  invariantResponse(postStatuses, "Post statuses unavailable", { status: 404 })

  return json({ post, postStatuses })
}

export default function PostSlugRoute() {
  const { userSession } = useRootLoaderData()
  const { post, postStatuses } = useLoaderData<typeof loader>()

  const isOwner = post.userId === userSession?.id
  const isUpdated = post.createdAt !== post.updatedAt
  const isArchived = post.status.symbol === "ARCHIVED"

  return (
    <div className="site-container space-y-8 pt-0">
      <ImageCover
        src={post.images[0]?.url}
        className="mx-auto w-full max-w-4xl"
        width={900}
        height={400}
      />

      <header className="site-header pb-4">
        {isArchived && (
          <Alert>This post has been archived by on {formatDateDMY(post.updatedAt)}</Alert>
        )}

        <h1>{post.title}</h1>

        <div className="space-y-2">
          <Link
            to={`/${post.user.username}`}
            className="flex items-center gap-2 transition hover:opacity-75"
          >
            <AvatarAuto user={post.user} imageUrl={post.user.images[0]?.url} />
            <div className="space-y-0">
              <h6>{post.user.fullname}</h6>
              <p className="text-sm text-muted-foreground">@{post.user.username}</p>
            </div>
          </Link>

          <div className="text-xs text-muted-foreground">
            <Timestamp
              isUpdated={isUpdated}
              createdAt={post.createdAt}
              updatedAt={post.updatedAt}
            />
          </div>
        </div>

        {!isOwner && (
          <div>
            <BadgePostStatus status={post.status} />
          </div>
        )}

        {isOwner && (
          <div className="flex flex-wrap gap-2">
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
            <ButtonLink to={`/user/posts/${post.id}`} prefetch="intent" variant="outline" size="xs">
              <IconMatch icon="note-pencil" />
              <span>Edit Post</span>
            </ButtonLink>
          </div>
        )}
      </header>

      <section className="site-section pb-20">
        <ViewHTML>{post.content}</ViewHTML>
      </section>

      <section className="site-section">
        <div>
          <ButtonLink to="/posts" size="sm" variant="secondary">
            <IconMatch icon="caret-left" />
            <span>All posts</span>
          </ButtonLink>
        </div>
      </section>
    </div>
  )
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: ({ params }) => <CustomErrorMessage params={params} />,
      }}
    />
  )
}

function CustomErrorMessage({ params }: { params: Params }) {
  return (
    <>
      <section className="site-section prose-config">
        <h1>Sorry, this post could not be found</h1>
        <p>Cannot find post with the slug "{params.postSlug}"</p>
        <p>The requested post either doesn’t exist or you don’t have access to it.</p>
      </section>

      <ErrorHelpInformation
        extraButtonLinks={
          <ButtonLink size="sm" variant="secondary" to="/posts">
            <IconMatch icon="scroll" />
            <span>Go to All Posts</span>
          </ButtonLink>
        }
      />
    </>
  )
}
