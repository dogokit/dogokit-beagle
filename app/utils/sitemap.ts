import { type SEOHandle } from "@nasa-gcn/remix-seo"

export function createSitemap(route?: string | null, priority?: number) {
  return {
    getSitemapEntries: () => {
      return route ? [{ route, priority }] : null
    },
  } as SEOHandle
}
