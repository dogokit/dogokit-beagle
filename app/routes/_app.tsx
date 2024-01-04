import { Outlet } from "@remix-run/react"

import { AppLayout } from "~/components/layout/app-layout"

export default function AppLayoutRoute() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
