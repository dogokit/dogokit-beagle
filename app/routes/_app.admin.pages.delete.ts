import { parse } from "@conform-to/zod"
import { json, redirect, type ActionFunctionArgs } from "@remix-run/node"

import { requireUser } from "~/helpers/auth"
import { modelAdminPage } from "~/models/admin-page.server"
import { schemaPageDeleteAll, schemaPageDeleteById } from "~/schemas/page"
import { createTimer } from "~/utils/timer"

export const action = async ({ request }: ActionFunctionArgs) => {
  const { userId } = await requireUser(request)

  const timer = createTimer()
  const formData = await request.formData()
  const intent = formData.get("intent")?.toString()

  if (intent === "user-delete-all-pages") {
    const submission = parse(formData, { schema: schemaPageDeleteAll })
    if (!submission.value) return json(submission, { status: 400 })
    await modelAdminPage.deleteAll({ userId, ...submission.value })
    await timer.delay()
    return redirect(`/user/pages`)
  }

  if (intent === "user-delete-page-by-id") {
    const submission = parse(formData, { schema: schemaPageDeleteById })
    if (!submission.value) return json(submission, { status: 400 })
    await modelAdminPage.deleteById({ userId, ...submission.value })
    await timer.delay()
    return redirect(`/user/pages`)
  }

  await timer.delay()
  return null
}
