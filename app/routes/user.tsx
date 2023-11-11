import { type LoaderFunctionArgs } from "@remix-run/node"
import { NavLink, Outlet } from "@remix-run/react"
import { Iconify } from "~/components/ui/iconify"
import { configNavigationItems } from "~/configs/navigation"

import { authenticator } from "~/services/auth.server"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" })
  return null
}

export default function UserLayoutRoute() {
  const userNavigationItems = [
    "/user/dashboard",
    "/user/settings",
    "/user/billing",
    "/user/account",
    "/user/notifications",
    "/logout",
  ]

  const items = configNavigationItems.filter(item =>
    userNavigationItems.includes(item.to),
  )

  return (
    <div className="flex gap-2">
      <aside className="w-full max-w-[140px] select-none border-r border-r-border p-2 sm:max-w-[200px]">
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
      </aside>

      <div className="app-container overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
