import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { Debug } from "~/components/shared/debug"
import { AvatarAuto } from "~/components/ui/avatar-auto"
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
  return json(await requireUser(request))
}

export default function AdminDashboardRoute() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header items-center gap-2 sm:gap-4">
        <div>
          <AvatarAuto
            user={user}
            imageUrl={user.images[0]?.url}
            className="outline outline-2 outline-background"
            size="lg"
          />
        </div>

        <div>
          <h2>
            <span className="hidden lg:inline">Welcome, </span>
            {user.fullname}
          </h2>
          <p className="text-muted-foreground">
            <span>{user.email}</span>
          </p>
        </div>
      </header>

      <section className="app-section">
        <Debug>{user}</Debug>
      </section>
    </div>
  )
}
