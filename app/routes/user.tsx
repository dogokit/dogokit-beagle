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
    <div className="mx-auto w-full">
      {/* LATER: Become a collapsible component: shared/sidebar + sidebar-nav-items */}
      <div className="mx-auto flex max-w-5xl">
        <nav className="select-none border-r border-r-border p-4">
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

        <div className="w-full">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
