import { type SEOHandle } from "@nasa-gcn/remix-seo"

import { modelUser } from "~/models/user.server"
import { formatDateYMD } from "~/utils/datetime"

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const users = await modelUser.getAllUsernames()
    return users.map(user => {
      return {
        route: `/${user.username}`,
        priority: 0.6,
        lastmod: formatDateYMD(user.updatedAt),
      }
    })
  },
}
