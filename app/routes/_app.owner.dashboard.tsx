import { type MetaFunction } from "@remix-run/node"

import { Debug } from "~/components/shared/debug"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({ title: `Owner Dashboard`, description: `Dashboard for owner` })

export default function OwnerDashboardRoute() {
  const { userData } = useRootLoaderData()
  if (!userData) return null

  return (
    <div className="app-container">
      <header className="app-header items-center gap-2 sm:gap-4">
        <div>
          <AvatarAuto user={userData} imageUrl={userData.images[0]?.url} />
        </div>

        <div>
          <h2>Owner Dashboard</h2>
          <p className="text-muted-foreground">
            <span>{userData.email}</span>
          </p>
        </div>
      </header>

      <section className="app-section">
        <Debug>{userData}</Debug>
      </section>
    </div>
  )
}
