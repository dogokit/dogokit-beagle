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
    title: `User Billing`,
    description: `Manage billing and subscription`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json(await requireUser(request))
}

export default function UserBillingRoute() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h2>User Billing</h2>
          <p>Manage payment and subscription</p>
        </div>
      </header>

      <section className="app-section"></section>
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
