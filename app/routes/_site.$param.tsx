import { type LoaderFunctionArgs } from "@remix-run/node"
import { Outlet, type Params } from "@remix-run/react"

import {
  ErrorHelpInformation,
  GeneralErrorBoundary,
} from "~/components/shared/error-boundary"
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
