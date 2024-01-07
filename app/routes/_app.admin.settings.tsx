import { parse } from "@conform-to/zod"
import { json, type ActionFunctionArgs, type MetaFunction } from "@remix-run/node"

import { schemaGeneralId } from "~/schemas/general"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({ title: `Settings`, description: `Admin settings` })

export default function AdminSettingsRoute() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h2>Settings</h2>
          <p>Manage application settings</p>
        </div>
      </header>

      <section className="app-section" />
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
