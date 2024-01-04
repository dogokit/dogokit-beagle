import { Outlet } from "@remix-run/react"

import { SiteLayout } from "~/components/layout/site-layout"

/**
 * EDITME: Change to a dedicated auth UI if want to
 */

export default function AuthLayoutRoute() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  )
}
