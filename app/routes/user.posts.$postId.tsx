import { conform, useForm } from "@conform-to/react"
import { getFieldsetConstraint, parse } from "@conform-to/zod"
import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "@remix-run/react"
import { z } from "zod"
import { Debug } from "~/components/shared/debug"
import { FormDelete } from "~/components/shared/form-delete"
import { ButtonLink } from "~/components/ui/button-link"
import { ButtonLoading } from "~/components/ui/button-loading"
import { FormErrors } from "~/components/ui/form"

import { Iconify } from "~/components/ui/iconify"
import { Time } from "~/components/ui/time"
import { requireUser } from "~/helpers/auth"
import { prisma } from "~/libs/db.server"
import { modelUserPost } from "~/models/user-post.server"
import { schemaPostUpdateById } from "~/schemas/post"
import { invariant, invariantResponse } from "~/utils/invariant"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"
import { createTimer } from "~/utils/timer"

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
  const { userId } = await requireUser(request)
  const post = await modelUserPost.getById({ userId, id: params.postId })
  invariantResponse(post, "Post not found", { status: 404 })
  return json({ post })
}

export default function UserPostsPostIdRoute() {
  const { post } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  const navigation = useNavigation()

  const isSubmitting = navigation.state === "submitting"
  const isUpdated = post.createdAt !== post.updatedAt

  // FIXME: Conform cannot reload with the new defaultValue after new post from nav
  const [form, { userId, id, slug, title, content }] = useForm<
    z.infer<typeof schemaPostUpdateById>
  >({
    id: "update-post",
    lastSubmission: actionData?.submission,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    constraint: getFieldsetConstraint(schemaPostUpdateById),
    onValidate({ formData }) {
      return parse(formData, { schema: schemaPostUpdateById })
    },
    defaultValue: { ...post, userId: post.userId },
  })

  return (
    <div className="app-container">
      <Debug isCollapsibleOpen hidden>
        {post}
      </Debug>

      <Form replace method="POST" {...form.props}>
        <fieldset className="space-y-8" disabled={isSubmitting}>
          <section className="app-section">
            <div className="flex flex-wrap items-center gap-2">
              <ButtonLoading
                variant="outline"
                size="xs"
                loadingText="Saving"
                isLoading={isSubmitting}
                iconComponent={<Iconify icon="ph:floppy-disk-duotone" />}
              >
                <span>Save</span>
              </ButtonLoading>
              <FormDelete
                action="/user/posts/delete"
                intentValue="user-delete-post-by-id"
                itemText={`a post: ${post.title} (${post.slug})`}
                defaultValue={post.id}
                requireUser
                userId={post.userId}
              />
              <ButtonLink
                variant="outline"
                size="xs"
                to={`/posts/${post.slug}`}
              >
                <Iconify icon="ph:arrow-square-out-duotone" />
                <span className="hidden sm:inline">View</span>
              </ButtonLink>

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

          <section className="mx-auto w-full max-w-prose space-y-4">
            <input type="hidden" {...conform.input(userId)} />
            <input type="hidden" {...conform.input(id)} />

            <div>
              <input
                {...conform.input(slug)}
                placeholder="untitled"
                spellCheck="false"
                className="input-natural font-mono text-sm text-muted-foreground"
              />
              <FormErrors>{slug}</FormErrors>
            </div>

            <div>
              <input
                {...conform.input(title)}
                placeholder="Untitled"
                spellCheck="false"
                className="input-natural font-heading text-4xl font-semibold"
              />
              <FormErrors>{title}</FormErrors>
            </div>

            <div>
              <FormErrors>{content}</FormErrors>
              <textarea
                {...conform.input(content)}
                placeholder="Add some content..."
                spellCheck="false"
                cols={30}
                rows={20}
                className="input-natural resize-none"
              />
            </div>
          </section>
        </fieldset>
      </Form>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const clonedRequest = request.clone()
  const formData = await clonedRequest.formData()

  const submission = await parse(formData, {
    async: true,
    schema: schemaPostUpdateById.superRefine(async (data, ctx) => {
      const { id, slug } = data
      const existingSlug = await prisma.post.findUnique({
        where: { slug, NOT: { id } },
        select: { id: true },
      })
      if (existingSlug) {
        ctx.addIssue({
          path: ["slug"],
          code: z.ZodIssueCode.custom,
          message: "Slug cannot be used, please change",
        })
        return
      }
    }),
  })

  if (!submission.value || submission.intent !== "submit") {
    await timer.delay()
    return json({ status: "error", submission }, { status: 400 })
  }

  const post = await modelUserPost.update(submission.value)

  await timer.delay()
  return redirect(`/user/posts/${post.id}`)
}
