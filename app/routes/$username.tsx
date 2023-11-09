import { type SEOHandle } from "@nasa-gcn/remix-seo"
import { type LoaderFunctionArgs } from "@remix-run/node"
import { Outlet } from "@remix-run/react"

import { configRedirects } from "~/configs/redirects"
import { modelUser } from "~/models/user.server"
import { formatDateLastMod } from "~/utils/datetime"
import { redirectRouteToURL } from "~/utils/redirect-route.server"

export const loader = ({ request }: LoaderFunctionArgs) => {
  return redirectRouteToURL(request, configRedirects)
}

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const users = await modelUser.getAllUsernames()
    return users.map(user => {
      return {
        route: `/${user.username}`,
        priority: 0.7,
        lastmod: formatDateLastMod(user.updatedAt),
      }
    })
  },
}

export default function UsernameLayoutRoute() {
  return <Outlet />
}
