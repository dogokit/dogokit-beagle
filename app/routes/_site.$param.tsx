import { type LoaderFunctionArgs } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

import { configRedirects } from "~/configs/redirects"
import { redirectRouteToUrl } from "~/utils/redirect-route.server"

/**
 * Param page can be used for:
 * - Pages
 * - Users
 */

export const loader = ({ request }: LoaderFunctionArgs) => {
  return redirectRouteToUrl(request, configRedirects)
}

export default function ParamLayoutRoute() {
  return <Outlet />
}
