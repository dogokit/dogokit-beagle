import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node"
import { isRouteErrorResponse, Outlet, useRouteError } from "@remix-run/react"

import { SidebarNavItems } from "~/components/shared/sidebar-nav-items"
import { Separator } from "~/components/ui/separator"
import { configNavigationItems } from "~/configs/navigation"
import { requireUser } from "~/helpers/auth"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

/**
 * RBAC for certain roles in the layout route
 */

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { userIsAllowed } = await requireUser(request, ["ADMIN"])
  if (!userIsAllowed) return redirect("/")
  return null
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const { userIsAllowed } = await requireUser(request, ["ADMIN"])
  if (!userIsAllowed) return redirect("/")
  return null
}

export default function OwnerLayoutRoute() {
  // Configure and order in app/configs/navigation.ts
  const navItems = ["/owner/dashboard"]

  return (
    <div className="flex">
      <nav className="select-none border-r border-r-border p-2 lg:p-4">
        <SidebarNavItems
          items={configNavigationItems.filter(item => navItems.includes(item.path))}
        />

        <Separator className="my-2" />
        <SidebarNavItems
          items={configNavigationItems.filter(item => ["/admin", "/user"].includes(item.path))}
        />
      </nav>

      <div className="min-h-screen w-full pb-20">
        <Outlet />
      </div>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  if (isRouteErrorResponse(error)) {
    return (
      <div className="app-container">
        <p>Error in Owner</p>
      </div>
    )
  }
  return (
    <div className="app-container">
      <p>Error in Owner</p>
    </div>
  )
}
