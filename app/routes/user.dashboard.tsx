import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import { Debug } from "~/components/shared/debug"
import { AvatarAuto } from "~/components/ui/avatar-auto"
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
      <header className="app-header items-center gap-4">
        <AvatarAuto user={user} imageUrl={user.images[0]?.url} />

        <div>
          <h2>
            <span className="hidden lg:inline">Hi, </span>
            {user.fullname}
          </h2>
          <p className="text-muted-foreground">
            <span>{user.email} / </span>
            <Link to={`/${user.username}`} className="hover:text-primary">
              @{user.username}
            </Link>
          </p>
        </div>
      </header>

      <section className="app-section">
        <ul className="grid max-w-3xl grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
          {metrics.map(metric => (
            <li key={metric.text}>
              <Link to={metric.to}>
                <Card className="p-4 text-center transition hover:bg-muted">
                  <p className="text-6xl font-extrabold">{metric.count}</p>
                  <span>{metric.text}</span>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <Debug name="user">{user}</Debug>
    </div>
  )
}
