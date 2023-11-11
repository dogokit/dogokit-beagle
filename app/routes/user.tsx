import { type LoaderFunctionArgs } from "@remix-run/node"
import { NavLink, Outlet } from "@remix-run/react"
import { Iconify } from "~/components/ui/iconify"

import { authenticator } from "~/services/auth.server"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

const userNavigationItems = [
  {
    text: "Dashboard",
    to: "/user/dashboard",
    icon: "ph:binoculars-duotone",
  },
  {
    text: "Settings",
    to: "/user/settings",
    icon: "ph:gear-duotone",
  },
  {
    text: "Billing",
    to: "/user/billing",
    icon: "ph:credit-card-duotone",
  },
  {
    text: "Notifications",
    to: "/user/notifications",
    icon: "ph:notification-duotone",
  },
]

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" })
  return null
}

export default function UserLayoutRoute() {
  return (
    <div className="flex gap-2">
      <aside className="w-full max-w-[140px] select-none border-r border-r-border p-2 sm:max-w-[200px]">
        <ul>
          {userNavigationItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className="flex items-center gap-2 p-2 hover:bg-secondary"
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
