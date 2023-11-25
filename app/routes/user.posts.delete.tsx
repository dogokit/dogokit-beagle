import { parse } from "@conform-to/zod"
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node"

import { modelUserPost } from "~/models/user-post.server"
import { schemaPostDeleteAll, schemaPostDeleteById } from "~/schemas/post"
import { createTimer } from "~/utils/timer"

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const formData = await request.formData()
  const intent = formData.get("intent")?.toString()

  if (intent === "user-delete-all-posts") {
    const submission = parse(formData, { schema: schemaPostDeleteAll })
    if (!submission.value) return json(submission)
    await modelUserPost.deleteAll(submission.value)
    await timer.delay()
    return redirect(`/user/posts`)
  }

  if (intent === "user-delete-post-by-id") {
    const submission = parse(formData, { schema: schemaPostDeleteById })
    if (!submission.value) return json(submission)
    await modelUserPost.deleteById(submission.value)
    await timer.delay()
    return redirect(`/user/posts`)
  }

  await timer.delay()
  return null
}
