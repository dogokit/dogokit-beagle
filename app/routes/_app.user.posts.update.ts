import { parse } from "@conform-to/zod"
import { json, type ActionFunctionArgs } from "@remix-run/node"

import { db } from "~/libs/db.server"
import { modelPostStatus } from "~/models/post-status.server"
import { schemaPostStatusUpdate } from "~/schemas/post"
import { invariantResponse } from "~/utils/invariant"
import { createTimer } from "~/utils/timer"

export async function action({ request }: ActionFunctionArgs) {
  const timer = createTimer()
  const formData = await request.formData()

  const submission = parse(formData, { schema: schemaPostStatusUpdate })
  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 })
  }

  const postStatus = await modelPostStatus.getBySymbol({
    symbol: submission.value.statusSymbol,
  })
  invariantResponse(postStatus, "Post status unavailable", { status: 404 })

  await db.post.update({
    where: { id: submission.value.postId },
    data: { statusId: postStatus.id },
  })

  await timer.delay()
  return json(submission)
}
