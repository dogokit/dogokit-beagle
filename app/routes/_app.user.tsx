import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

import { SidebarNavItems } from "~/components/shared/sidebar-nav-items"
import { Separator } from "~/components/ui/separator"
import { configNavigationItems } from "~/configs/navigation"
import { checkAllowance } from "~/helpers/auth"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { modelPostStatus } from "~/models/post-status.server"
import { authService } from "~/services/auth.server"
import { cn } from "~/utils/cn"
import { invariantResponse } from "~/utils/invariant"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authService.isAuthenticated(request, { failureRedirect: "/login" })

  const postStatuses = await modelPostStatus.getAll()
  invariantResponse(postStatuses, "Post statuses unavailable", { status: 404 })

  return json({ postStatuses })
}

export default function UserLayoutRoute() {
  const { userData } = useRootLoaderData()

  // Configure and order in app/configs/navigation.ts
  const navItems = [
    "/user/dashboard",
    "/user/posts",
    "/user/settings",
    "/user/billing", // Still an example
    "/user/notifications", // Still an example
    "/user/account",
  ]

  // IDEA: Use a collapsible and resizable component: shared/sidebar + sidebar-nav-items
  return (
    <div className="flex">
      <nav className={cn("select-none border-r border-r-border p-2 lg:p-4")}>
        <SidebarNavItems
          items={configNavigationItems.filter(item => navItems.includes(item.path))}
        />

        {checkAllowance(["ADMIN", "MANAGER"], userData) && (
          <>
            <Separator className="my-2" />
            <SidebarNavItems
              items={configNavigationItems.filter(item => ["/admin"].includes(item.path))}
            />
          </>
        )}

        {checkAllowance(["ADMIN"], userData) && (
          <>
            <Separator className="my-2" />
            <SidebarNavItems
              items={configNavigationItems.filter(item => ["/owner"].includes(item.path))}
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
