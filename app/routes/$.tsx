import { type LoaderFunctionArgs } from "@remix-run/node"

import { configRedirects } from "~/configs/redirects"
import { redirectRouteToURL } from "~/utils/redirect-route.server"

export const loader = ({ request }: LoaderFunctionArgs) => {
  return redirectRouteToURL(request, configRedirects)
}
