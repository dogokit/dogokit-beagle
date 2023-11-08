import { type LoaderFunctionArgs } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

import { authenticator } from "~/services/auth.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" })
  return null
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
