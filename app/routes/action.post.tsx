import { parse } from "@conform-to/zod"
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node"

import { modelUserPost } from "~/models/user-post.server"
import { schemaPostDeleteAll, schemaPostDeleteById } from "~/schemas/post"

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const intent = formData.get("intent")?.toString()

  if (intent === "user-delete-all-posts") {
    const submission = parse(formData, { schema: schemaPostDeleteAll })
    if (!submission.value) return json(submission)
    await modelUserPost.deleteAll(submission.value)
    return redirect(`/user/posts`)
  }

  if (intent === "user-delete-post-by-id") {
    const submission = parse(formData, { schema: schemaPostDeleteById })
    if (!submission.value) return json(submission)
    await modelUserPost.deleteById(submission.value)
    return redirect(`/user/posts`)
  }

  return null
}
