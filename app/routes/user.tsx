import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { SidebarNavItems } from "~/components/shared/sidebar-nav-items"
import { Separator } from "~/components/ui/separator"
import { configNavigationItems } from "~/configs/navigation"
import { useAppMode } from "~/hooks/use-app-mode"
import { modelPostStatus } from "~/models/post-status.server"

import { authenticator } from "~/services/auth.server"
import { cn } from "~/utils/cn"
import { invariantResponse } from "~/utils/invariant"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" })

  const postStatuses = await modelPostStatus.getAll()
  invariantResponse(postStatuses, "Post statuses are unavailable", {
    status: 404,
  })

  return json({ postStatuses })
}

export default function UserLayoutRoute() {
  const { isModeDevelopment } = useAppMode()

  // Configure in app/configs/navigation.ts
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
    <div className="mx-auto w-full pb-20">
      {/* IDEA: Become a collapsible component: shared/sidebar + sidebar-nav-items */}
      <div className="mx-auto flex max-w-6xl">
        <nav className={cn("select-none border-r border-r-border p-2 lg:p-4")}>
          <SidebarNavItems
            items={configNavigationItems.filter(item =>
              navItems.includes(item.path),
            )}
          />

          <Separator className="my-2" />

          {isModeDevelopment && (
            <SidebarNavItems
              items={configNavigationItems.filter(item =>
                extraNavItems.includes(item.path),
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
