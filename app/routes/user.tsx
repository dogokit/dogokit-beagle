import { type LoaderFunctionArgs } from "@remix-run/node"
import { NavLink, Outlet } from "@remix-run/react"
import { Iconify } from "~/components/ui/iconify"
import { configNavigationItems, type NavItem } from "~/configs/navigation"
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

  const userNavItems = [
    "/user/dashboard",
    "/user/settings",
    "/user/billing",
    "/user/account",
    "/user/notifications",
    "/logout",
  ]

  const userAdminItems = ["/admin"]

  return (
    <div className="flex gap-2">
      <nav className="w-full max-w-[140px] select-none divide-y border-r border-r-border p-2 sm:max-w-[200px]">
        <DashboardNavItems
          items={configNavigationItems.filter(item =>
            userNavItems.includes(item.to),
          )}
        />
        {isModeDevelopment && (
          <DashboardNavItems
            items={configNavigationItems.filter(item =>
              userAdminItems.includes(item.to),
            )}
          />
        )}
      </nav>

      <div className="app-container overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

function DashboardNavItems({ items }: { items: NavItem[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className="flex items-center gap-2 rounded p-2 transition-colors hover:bg-secondary"
          >
            <Iconify icon={item.icon} />
            <span>{item.text}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
