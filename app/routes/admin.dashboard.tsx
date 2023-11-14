import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { Debug } from "~/components/shared/debug"
import { requireUser } from "~/helpers/auth"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `Admin Dashboard`,
    description: `Dashboard for administrator`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ user: await requireUser(request) })
}

export default function AdminDashboardRoute() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>Welcome, {user.fullname}</h2>
      </header>

      <section className="app-section">
        <Debug>{user}</Debug>
      </section>
    </div>
  )
}
