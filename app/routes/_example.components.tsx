import { Link, Outlet } from "@remix-run/react"

import { SidebarNavItems } from "~/components/shared/sidebar-nav-items"
import { Card } from "~/components/ui/card"
import { configComponents } from "~/configs/components"

export default function ExampleComponentsRoute() {
  return (
    <div className="site-container space-y-8">
      <header>
        <h1>
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
