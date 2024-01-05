import { parse } from "@conform-to/zod"
import { json, type ActionFunctionArgs } from "@remix-run/node"

import { requireUser } from "~/helpers/auth"
import { modelPostStatus } from "~/models/post-status.server"
import { modelUserPost } from "~/models/user-post.server"
import { schemaPostStatusUpdate } from "~/schemas/post"
import { invariantResponse } from "~/utils/invariant"
import { createTimer } from "~/utils/timer"

export async function action({ request }: ActionFunctionArgs) {
  const { userId } = await requireUser(request)

  const timer = createTimer()
  const formData = await request.formData()
  const intent = formData.get("intent")?.toString()

  if (intent === "update-post-status") {
    const submission = parse(formData, { schema: schemaPostStatusUpdate })
    if (!submission.value) return json(submission, { status: 400 })
    const { statusSymbol: symbol } = submission.value

    const postStatus = await modelPostStatus.getBySymbol({ symbol })
    invariantResponse(postStatus, "Post status unavailable", { status: 404 })

    await modelUserPost.updateStatus({
      userId,
      id: submission.value.postId,
      statusId: postStatus.id,
    })

    await timer.delay()
    return json(submission)
  }

  await timer.delay()
  return null
}
