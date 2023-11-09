import { type LoaderFunctionArgs } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

import { authenticator } from "~/services/auth.server"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const loader = ({ request }: LoaderFunctionArgs) => {
  return authenticator.isAuthenticated(request, { failureRedirect: "/login" })
}

export default function UserLayoutRoute() {
  return (
    <div className="flex gap-2">
      <aside className="w-full max-w-[140px] select-none border-r border-r-border p-2 sm:max-w-[200px]">
        <ul>
          <li>Dashboard</li>
          <li>Settings</li>
        </ul>
      </aside>

      <div className="app-container overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}
