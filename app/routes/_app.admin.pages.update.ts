import { parse } from "@conform-to/zod"
import { json, type ActionFunctionArgs } from "@remix-run/node"

import { requireUser } from "~/helpers/auth"
import { modelAdminPage } from "~/models/admin-page.server"
import { modelPageStatus } from "~/models/page-status.server"
import { schemaPageStatusUpdate } from "~/schemas/page"
import { invariantResponse } from "~/utils/invariant"
import { createTimer } from "~/utils/timer"

export async function action({ request }: ActionFunctionArgs) {
  const { userId } = await requireUser(request)

  const timer = createTimer()
  const formData = await request.formData()
  const intent = formData.get("intent")?.toString()

  if (intent === "update-page-status") {
    const submission = parse(formData, { schema: schemaPageStatusUpdate })
    if (!submission.value) return json(submission, { status: 400 })
    const { statusSymbol: symbol } = submission.value

    const pageStatus = await modelPageStatus.getBySymbol({ symbol })
    invariantResponse(pageStatus, "Page status unavailable", { status: 404 })

    await modelAdminPage.updateStatus({
      userId,
      id: submission.value.pageId,
      statusId: pageStatus.id,
    })

    await timer.delay()
    return json(submission)
  }

  await timer.delay()
  return null
}
