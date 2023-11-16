import { type SEOHandle } from "@nasa-gcn/remix-seo"

import { modelPost } from "~/models/post.server"
import { formatDateLastMod } from "~/utils/datetime"

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const posts = await modelPost.getAllSlugs()
    return posts.map(post => {
      return {
        route: `/posts/${post.slug}`,
        priority: 0.5,
        lastmod: formatDateLastMod(post.updatedAt),
      }
    })
  },
}
