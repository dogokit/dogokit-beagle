import { Outlet } from "@remix-run/react"

import { SiteLayout } from "~/components/layout/site-layout"

/**
 * EDITME: Change to a different layout if want to
 */

export default function PageLayoutRoute() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  )
}
