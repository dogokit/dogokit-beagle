import { Outlet } from "@remix-run/react"

import { SiteLayout } from "~/components/layout/site-layout"

export default function SiteLayoutRoute() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  )
}
