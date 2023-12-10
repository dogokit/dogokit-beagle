import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { Link, useLoaderData, type Params } from "@remix-run/react"
import { BadgePostStatus } from "~/components/shared/badge-post-status"
import { ViewHTML } from "~/components/shared/view-html"

import {
  ErrorHelpInformation,
  GeneralErrorBoundary,
} from "~/components/shared/error-boundary"
import { FormChangeStatus } from "~/components/shared/form-change-status"
import { ImageCover } from "~/components/shared/image-cover"
import { Timestamp } from "~/components/shared/timestamp"
import { Alert } from "~/components/ui/alert"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { prisma } from "~/libs/db.server"
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
    })
  }
  return createMeta({
    title: post.title,
    description: post.excerpt,
  })
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.postSlug, "params.postSlug unavailable")

  const [post, postStatuses] = await prisma.$transaction([
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

      <header className="site-header">
        {isArchived && (
          <Alert>
            This post has been archived by on {formatDateDMY(post.updatedAt)}
          </Alert>
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
              <p className="text-sm text-muted-foreground">
                @{post.user.username}
              </p>
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
            <FormChangeStatus
              itemId="postId"
              action="/user/posts/patch"
              intentValue="change-post-status"
              dialogTitle="Change post's status"
              dialogDescription={`Change the status of post: ${post.title} (${post.slug})`}
              itemStatuses={postStatuses}
              item={post as any}
            />
            <ButtonLink
              to={`/user/posts/${post.id}`}
              variant="outline"
              size="xs"
            >
              <Iconify icon="ph:note-pencil" />
              <span>Edit Post</span>
            </ButtonLink>
          </div>
        )}
      </header>

      <section className="site-section pb-20 pt-4">
        <ViewHTML>{post.content}</ViewHTML>
      </section>

      <section className="site-section">
        <div>
          <ButtonLink to="/posts" size="sm" variant="secondary">
            <Iconify icon="ph:caret-left" />
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
        404: ({ params }) => <PostSlugErrorMessage params={params} />,
      }}
    />
  )
}

function PostSlugErrorMessage({ params }: { params: Params }) {
  return (
    <>
      <section className="site-section prose-config">
        <h1>Sorry, this post could not be found</h1>
        <p>Cannot find post with the slug "{params.postSlug}"</p>
        <p>
          The requested post either doesn’t exist or you don’t have access to
          it.
        </p>
      </section>

      <ErrorHelpInformation
        extraButtonLinks={
          <ButtonLink size="sm" variant="secondary" to="/posts">
            <Iconify icon="ph:scroll-duotone" />
            <span>Go to All Posts</span>
          </ButtonLink>
        }
      />
    </>
  )
}
