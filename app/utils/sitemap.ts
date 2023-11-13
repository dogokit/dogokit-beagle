import { type SEOHandle } from "@nasa-gcn/remix-seo"

/**
 * If the params are empty, then it will not create a sitemap
 */
export function createSitemap(route?: string | null, priority?: number) {
  return {
    getSitemapEntries: () => {
      return route ? [{ route, priority }] : null
    },
  } as SEOHandle
}
