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

export const meta: MetaFunction = () =>
  createMeta({
    title: `User Billing`,
    description: `Manage billing and subscription`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await requireUser(request) })
}

export default function UserBillingRoute() {
  return (
    <div className="site-container">
      <section className="site-section space-y-2">
        <header className="space-y-2">
          <h3>User Billing</h3>
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
