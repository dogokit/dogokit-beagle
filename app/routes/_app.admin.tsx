import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node"
import { Outlet, isRouteErrorResponse, useRouteError } from "@remix-run/react"

import { SidebarNavItems } from "~/components/shared/sidebar-nav-items"
import { Separator } from "~/components/ui/separator"
import { configNavigationItems } from "~/configs/navigation"
import { checkAllowance, requireUser } from "~/helpers/auth"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

/**
 * RBAC for certain roles in the layout route
 */

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { userIsAllowed } = await requireUser(request, ["ADMIN", "MANAGER"])
  if (!userIsAllowed) return redirect("/")
  return null
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const { userIsAllowed } = await requireUser(request, ["ADMIN", "MANAGER"])
  if (!userIsAllowed) return redirect("/")
  return null
}

export default function AdminLayoutRoute() {
  const { userData } = useRootLoaderData()

  // Configure and order in app/configs/navigation.ts
  const navItems = [
    "/admin/dashboard",
    "/admin/users",
    "/admin/posts",
    "/admin/settings", // Still an example
  ]

  return (
    <div className="flex">
      <nav className="select-none border-r border-r-border p-2 lg:p-4">
        <SidebarNavItems
          items={configNavigationItems.filter(item =>
            navItems.includes(item.path),
          )}
        />

        <Separator className="my-2" />
        <SidebarNavItems
          items={configNavigationItems.filter(item =>
            ["/user"].includes(item.path),
          )}
        />

        {checkAllowance(["ADMIN"], userData) && (
          <>
            <Separator className="my-2" />
            <SidebarNavItems
              items={configNavigationItems.filter(item =>
                ["/owner"].includes(item.path),
              )}
            />
          </>
        )}
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
    return <div />
  }
  return <div />
}
