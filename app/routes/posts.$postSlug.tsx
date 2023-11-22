import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { Link, useLoaderData, type Params } from "@remix-run/react"

import {
  ErrorHelpInformation,
  GeneralErrorBoundary,
} from "~/components/shared/error-boundary"
import { Alert } from "~/components/ui/alert"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { Time } from "~/components/ui/time"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { modelPost } from "~/models/post.server"
import { formatDate } from "~/utils/datetime"
import { invariant, invariantResponse } from "~/utils/invariant"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  const post = data?.post

  if (!post) {
    return createMeta({
      title: "Post not found",
      description: `Cannot find post with slug ${params.username}`,
    })
  }
  return createMeta({
    title: post.title,
    description: String(post.content),
  })
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.postSlug, "params.postSlug unavailable")

  const post = await modelPost.getBySlug({ slug: params.postSlug })
  invariantResponse(post, "Post not found", { status: 404 })

  return json({ post })
}

export default function PostSlugRoute() {
  const { userSession } = useRootLoaderData()
  const { post } = useLoaderData<typeof loader>()

  const isOwner = post.userId === userSession?.id
  const isUpdated = post.createdAt !== post.updatedAt

  const isArchived = post.status.symbol === "ARCHIVED"

  return (
    <div className="site-container space-y-8">
      <header className="site-header">
        {isArchived && (
          <Alert>
            This post has been archived by on {formatDate(post.updatedAt)}
          </Alert>
        )}

        <h1>
          <Link to={`/posts/${post.slug}`}>{post.title}</Link>
        </h1>

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
            {!isUpdated && (
              <p>
                Created <Time>{post.createdAt}</Time>
              </p>
            )}
            {isUpdated && (
              <p>
                Updated <Time>{post.updatedAt}</Time>
              </p>
            )}
          </div>
        </div>

        {isOwner && (
          <ButtonLink to={`/user/posts/${post.id}`} variant="outline" size="xs">
            <Iconify icon="ph:note-pencil" />
            <span>Edit Post</span>
          </ButtonLink>
        )}
      </header>

      <section className="site-section pb-20 pt-4">
        <article className="prose-config whitespace-pre-wrap">
          {post.content}
        </article>
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
        404: ({ params }) => <UsernameErrorMessage params={params} />,
      }}
    />
  )
}

function UsernameErrorMessage({ params }: { params: Params }) {
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
      <ErrorHelpInformation />
    </>
  )
}
