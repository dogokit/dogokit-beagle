import { parse } from "@conform-to/zod"
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { requireUser } from "~/helpers/auth"

import { schemaGeneralId } from "~/schemas/general"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `User Notifications`,
    description: `Manage notifications and alerts`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await requireUser(request) })
}

export default function UserNotificationsRoute() {
  return (
    <div className="app-container">
      <section className="app-section space-y-2">
        <header className="app-header">
          <h3>User Notifications</h3>
          <p>Description</p>
        </header>
      </section>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const submission = parse(formData, { schema: schemaGeneralId })
  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 })
  }
  return json(submission)
}
