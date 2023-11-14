import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { Form, useLoaderData } from "@remix-run/react"
import { Button } from "~/components/ui/button"

import { Iconify } from "~/components/ui/iconify"
import { Time } from "~/components/ui/time"
import { requireUserId } from "~/helpers/auth"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { modelUserPost } from "~/models/user-post.server"
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

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  invariant(params.postId, "params.postId unavailable")
  const userId = await requireUserId(request)

  const post = await modelUserPost.getById({ id: params.postId, userId })
  invariantResponse(post, "Post not found", { status: 404 })

  return json({ post })
}

export default function UserPostsPostIdRoute() {
  const { userSession } = useRootLoaderData()
  const { post } = useLoaderData<typeof loader>()

  const isUpdated = post.createdAt !== post.updatedAt

  return (
    <div className="app-container space-y-8">
      <section className="app-section">
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="xs">
            <Iconify icon="ph:floppy-disk-duotone" />
            <span>Save</span>
          </Button>
          <Button variant="outline" size="xs">
            <Iconify icon="ph:trash-duotone" />
            <span>Delete</span>
          </Button>

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
      </section>

      <section className="mx-auto w-full max-w-prose">
        <Form replace method="POST" className="flex flex-col gap-2">
          <input type="hidden" name="userId" defaultValue={userSession?.id} />
          <input type="hidden" name="postId" defaultValue={post.id} />

          {/* TODO: Make these editable with forms that is clean */}
          <code className="text-muted-foreground">{post.slug}</code>
          <h1>{post.title}</h1>
          <article className="prose-config whitespace-pre-wrap">
            {post.content}
          </article>
        </Form>
      </section>
    </div>
  )
}
