import { Link, Outlet } from "@remix-run/react"

import { SidebarNavItems } from "~/components/shared/sidebar-nav-items"
import { Card } from "~/components/ui/card"
import { Iconify } from "~/components/ui/iconify"
import { configComponents } from "~/configs/components"

export default function ExampleComponentsRoute() {
  return (
    <div className="site-container space-y-12 pt-4">
      <header>
        <h1 className="inline-flex items-center gap-2 text-primary">
          <Iconify icon="ph:bounding-box-duotone" />
          <Link to="/components">Components</Link>
        </h1>
      </header>

      <section className="flex gap-4">
        <SidebarNavItems items={configComponents} />

        <Card className="flex-1 p-4">
          <Outlet />
        </Card>
      </section>
    </div>
  )
}
