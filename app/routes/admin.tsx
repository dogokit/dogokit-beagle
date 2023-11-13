import { type LoaderFunctionArgs } from "@remix-run/node"
import { NavLink, Outlet } from "@remix-run/react"
import { Iconify } from "~/components/ui/iconify"
import { Separator } from "~/components/ui/separator"
import { configNavigationItems, type NavItem } from "~/configs/navigation"
import { useAppMode } from "~/hooks/use-app-mode"

import { authenticator } from "~/services/auth.server"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" })
  // TODO: Check for role here
  return null
}

export default function AdminLayoutRoute() {
  const { isModeDevelopment } = useAppMode()

  const navItems = [
    "/admin/dashboard",
    "/admin/settings",
    "/admin/notifications",
    "/logout",
  ]

  const extraNavItems = ["/user"]

  return (
    <div className="flex gap-2">
      <nav className="w-full max-w-[200px] select-none border-r border-r-border p-2 sm:max-w-[240px]">
        <DashboardNavItems
          items={configNavigationItems.filter(item =>
            navItems.includes(item.to),
          )}
        />

        {isModeDevelopment && <Separator className="my-4" />}

        {isModeDevelopment && (
          <DashboardNavItems
            items={configNavigationItems.filter(item =>
              extraNavItems.includes(item.to),
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
