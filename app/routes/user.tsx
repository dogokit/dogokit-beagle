import { type LoaderFunctionArgs } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { SidebarNavItems } from "~/components/shared/sidebar-nav-items"
import { Separator } from "~/components/ui/separator"
import { configNavigationItems } from "~/configs/navigation"
import { useAppMode } from "~/hooks/use-app-mode"

import { authenticator } from "~/services/auth.server"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" })
  return null
}

export default function UserLayoutRoute() {
  const { isModeDevelopment } = useAppMode()

  const navItems = [
    "/user/dashboard",
    "/user/posts",
    "/user/settings",
    "/user/billing",
    "/user/account",
    "/user/notifications",
    "/logout",
  ]

  const extraNavItems = ["/admin"]

  return (
    <div className="flex">
      {/* LATER: Become a collapsible component: shard/sidebar + sidebar-nav-items */}
      <nav className="app-sidebar">
        <SidebarNavItems
          items={configNavigationItems.filter(item =>
            navItems.includes(item.to),
          )}
        />

        <Separator className="my-2" />

        {isModeDevelopment && (
          <SidebarNavItems
            items={configNavigationItems.filter(item =>
              extraNavItems.includes(item.to),
            )}
          />
        )}
      </nav>

      <div className="app-outlet">
        <Outlet />
      </div>
    </div>
  )
}
