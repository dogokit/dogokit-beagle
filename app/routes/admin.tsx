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
  // LATER: Check for role here
  return null
}

export default function AdminLayoutRoute() {
  const { isModeDevelopment } = useAppMode()

  const navItems = [
    "/admin/dashboard",
    "/admin/posts",
    "/admin/settings",
    "/admin/notifications",
    "/logout",
  ]

  const extraNavItems = ["/user"]

  return (
    <div className="flex">
      <nav className="select-none border-r border-r-border p-4">
        <SidebarNavItems
          items={configNavigationItems.filter(item =>
            navItems.includes(item.to),
          )}
        />

        {isModeDevelopment && <Separator className="my-2" />}

        {isModeDevelopment && (
          <SidebarNavItems
            items={configNavigationItems.filter(item =>
              extraNavItems.includes(item.to),
            )}
          />
        )}
      </nav>

      <Outlet />
    </div>
  )
}
