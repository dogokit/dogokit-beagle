import { PrismaClient } from "@prisma/client"

import { formatDateYMD } from "~/utils/datetime"
import { type SEOHandle } from "~/utils/sitemap"

const prisma = new PrismaClient()

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const users = await prisma.user.findMany({
      select: { username: true, updatedAt: true },
      orderBy: { username: "asc" },
    })

    return users.map(user => {
      return {
        route: `/${user.username}`,
        priority: 0.6,
        lastmod: formatDateYMD(user.updatedAt),
      }
    })
  },
}
