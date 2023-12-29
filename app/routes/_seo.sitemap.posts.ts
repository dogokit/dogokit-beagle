import { modelPost } from "~/models/post.server"
import { formatDateYMD } from "~/utils/datetime"
import { type SEOHandle } from "~/utils/sitemap"

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const posts = await modelPost.getAllSlugs()

    return posts.map(post => {
      return {
        route: `/posts/${post.slug}`,
        priority: 0.5,
        lastmod: formatDateYMD(post.updatedAt),
      }
    })
  },
}
