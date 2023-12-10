import { conform, useForm, useInputEvent } from "@conform-to/react"
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
import { useRef, useState } from "react"
import { z } from "zod"
import { EditorTiptapHook } from "~/components/libs/editor-tiptap"
import { FormChangeStatus } from "~/components/shared/form-change-status"
import { FormDelete } from "~/components/shared/form-delete"
import { ButtonLink } from "~/components/ui/button-link"
import { ButtonLoading } from "~/components/ui/button-loading"
import { FormErrors } from "~/components/ui/form"

import { Timestamp } from "~/components/shared/timestamp"
import { Button } from "~/components/ui/button"
import { Iconify } from "~/components/ui/iconify"
import { Separator } from "~/components/ui/separator"
import { TextareaAutosize } from "~/components/ui/textarea-autosize"
import { requireUser } from "~/helpers/auth"
import { useAppUserLoaderData } from "~/hooks/use-app-loader-data"
import { prisma } from "~/libs/db.server"
import { modelUserPost } from "~/models/user-post.server"
import { schemaPost } from "~/schemas/post"
import { invariant, invariantResponse } from "~/utils/invariant"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"
import { createSlug, truncateText } from "~/utils/string"
import { createTimer } from "~/utils/timer"

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
  const { postStatuses } = useAppUserLoaderData()

  const [form, { userId, id, slug, title, content }] = useForm<
    z.infer<typeof schemaPost>
  >({
    id: "update-post",
    lastSubmission: actionData?.submission,
    shouldRevalidate: "onInput",
    constraint: getFieldsetConstraint(schemaPost),
    onValidate({ formData }) {
      return parse(formData, { schema: schemaPost })
    },
    defaultValue: { ...post, userId: post.userId },
  })

  const isSubmitting = navigation.state === "submitting"
  const isPostUpdated = post.createdAt !== post.updatedAt
  const isPostDraft = post.status.symbol === "DRAFT"
  const isPostPublished = !isPostDraft

  const [titleValue, setTitleValue] = useState(title.defaultValue ?? "")
  const slugRef = useRef<HTMLInputElement>(null)
  const slugControl = useInputEvent({ ref: slugRef })

  const [contentValue, setContentValue] = useState(content.defaultValue ?? "")
  const contentRef = useRef<HTMLInputElement>(null)
  const contentControl = useInputEvent({ ref: contentRef })

  function handleReset() {
    form.ref.current?.reset()
    setTitleValue(post.title)
    setContentValue(post.content)
  }

  function handleUpdateSlug() {
    const newSlug = createSlug(titleValue)
    slugControl.change(newSlug)
  }

  function handleUpdateContent(htmlString: string) {
    contentControl.change(htmlString)
  }

  if (!post) return null

  return (
    <div className="app-container">
      <Form replace method="POST" {...form.props}>
        <fieldset className="space-y-8" disabled={isSubmitting}>
          <section className="app-section">
            <div className="flex flex-wrap items-center justify-between gap-2">
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
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={handleReset}
                >
                  <Iconify icon="ph:arrow-counter-clockwise" />
                  <span>Reset</span>
                </Button>
                <FormDelete
                  action="/user/posts/delete"
                  intentValue="user-delete-post-by-id"
                  itemText={`a post: ${truncateText(post.title)} (${
                    post.slug
                  })`}
                  defaultValue={post.id}
                  requireUser
                  userId={post.userId}
                />
                <ButtonLink
                  variant="outline"
                  size="xs"
                  to={`/posts/${post.slug}`}
                  disabled={isPostDraft}
                >
                  <Iconify icon="ph:arrow-square-out-duotone" />
                  <span>View</span>
                </ButtonLink>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <ButtonLoading
                  type="button"
                  variant="outline"
                  size="xs"
                  loadingText="Publishing"
                  isLoading={isSubmitting}
                  iconComponent={
                    <Iconify
                      icon={
                        isPostPublished
                          ? "ph:book-open-duotone"
                          : "ph:book-open-text-duotone"
                      }
                    />
                  }
                >
                  <span>{isPostPublished ? "Unpublish" : "Publish"}</span>
                </ButtonLoading>

                <FormChangeStatus
                  itemId="postId"
                  action="/user/posts/patch"
                  intentValue="change-post-status"
                  dialogTitle="Change post's status"
                  dialogDescription={`Change the status of post: ${post.title} (${post.slug})`}
                  itemStatuses={postStatuses}
                  item={post as any}
                />
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-prose space-y-4">
            <input type="hidden" {...conform.input(userId)} />
            <input type="hidden" {...conform.input(id)} />

            <div className="text-xs text-muted-foreground">
              <Timestamp
                isUpdated={isPostUpdated}
                createdAt={post.createdAt}
                updatedAt={post.updatedAt}
              />
            </div>

            <div>
              <div className="flex justify-between gap-2">
                <input
                  {...conform.input(slug)}
                  ref={slugRef}
                  placeholder="untitled"
                  spellCheck="false"
                  className="input-natural flex-1 font-mono text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="xs"
                  onClick={handleUpdateSlug}
                >
                  <Iconify icon="ph:lightbulb-duotone" />
                  <span>Generate Slug</span>
                </Button>
              </div>
              <FormErrors>{slug}</FormErrors>
            </div>

            <div>
              <TextareaAutosize
                name={title.name}
                minRows={1}
                defaultValue={titleValue}
                onChange={e => setTitleValue(e.target.value)}
                placeholder="Untitled"
                spellCheck="false"
                className="input-natural w-full resize-none text-4xl font-semibold"
              />
              <FormErrors>{title}</FormErrors>
            </div>

            <Separator className="my-4" />

            <div>
              <FormErrors>{content}</FormErrors>
              <input
                {...conform.input(content, { hidden: true })}
                ref={contentRef}
                onChange={e => setContentValue(e.target.value)}
              />
              <EditorTiptapHook
                content={contentValue}
                handleUpdate={handleUpdateContent}
              />
            </div>

            {/* Manual textarea editor */}
            <div className="hidden">
              <textarea
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
    schema: schemaPost.superRefine(async (data, ctx) => {
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
