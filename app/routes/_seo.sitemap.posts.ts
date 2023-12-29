import { PrismaClient } from "@prisma/client"

import { formatDateYMD } from "~/utils/datetime"
import { type SEOHandle } from "~/utils/sitemap"

const prisma = new PrismaClient()

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const posts = await prisma.post.findMany({
      where: { status: { symbol: "PUBLISHED" } },
      select: { slug: true, updatedAt: true },
      orderBy: { slug: "asc" },
    })

    return posts.map(post => {
      return {
        route: `/posts/${post.slug}`,
        priority: 0.5,
        lastmod: formatDateYMD(post.updatedAt),
      }
    })
  },
}
