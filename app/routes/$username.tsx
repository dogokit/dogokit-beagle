import { type SEOHandle } from "@balavishnuvj/remix-seo"
import { Outlet } from "@remix-run/react"

import { modelUser } from "~/models/user.server"
import { formatDateLastMod } from "~/utils/datetime"

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
