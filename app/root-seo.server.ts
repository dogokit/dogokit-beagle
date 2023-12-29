/**
 * @balavishnuvj/remix-seo
 * https://github.com/balavishnuvj/remix-seo
 *
 * Currently @nasa-gcn/remix-seo doesn't work on Vite yet
 */
import { generateSitemap } from "@balavishnuvj/remix-seo"
import { type EntryContext } from "@remix-run/node"

import { getDomainUrl } from "~/utils/url.server"

type Handler = (
  request: Request,
  remixContext: EntryContext,
) => Promise<Response | null> | null

export const rootSeoRoutes: Record<string, Handler> = {
  "/sitemap.xml": (request, remixContext) => {
    return generateSitemap(request, remixContext, {
      siteUrl: getDomainUrl(request),
      headers: {
        "Cache-Control": `public, max-age=${60 * 5}`,
      },
    })
  },
}

export const rootSeoRouteHandlers: Array<Handler> = [
  ...Object.entries(rootSeoRoutes).map(([path, handler]) => {
    return (request: Request, remixContext: EntryContext) => {
      if (new URL(request.url).pathname !== path) return null
      return handler(request, remixContext)
    }
  }),
]
