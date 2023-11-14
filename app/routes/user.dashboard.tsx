import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import { Debug } from "~/components/shared/debug"
import { Card } from "~/components/ui/card"
import { configUserDashboard } from "~/configs/user-dashboard"
import { requireUser } from "~/helpers/auth"
import { prisma } from "~/libs/db.server"
import { modelUserPost } from "~/models/user-post.server"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `User Dashboard`,
    description: `Dashboard for personal user`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { user, userId } = await requireUser(request)
  const counts = await prisma.$transaction([modelUserPost.count({ userId })])

  const metrics = configUserDashboard.navItems
    .filter(item => item.isMetric)
    .map((item, index) => {
      return { ...item, count: counts[index] }
    })

  return json({ user, metrics })
}

export default function UserDashboardRoute() {
  const { user, metrics } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>Welcome, {user.fullname}</h2>
        <p className="text-muted-foreground">
          <span>{user.email} / </span>
          <Link to={`/${user.username}`} className="hover:text-primary">
            @{user.username}
          </Link>
        </p>
        <Debug name="user">{user}</Debug>
      </header>

      <section className="app-section">
        <ul className="grid max-w-3xl grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {metrics.map(metric => {
            return (
              <li key={metric.text}>
                <Link to={metric.to}>
                  <Card className="p-4 text-center transition hover:bg-secondary">
                    <p className="text-6xl font-extrabold">{metric.count}</p>
                    <span>{metric.text}</span>
                  </Card>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
