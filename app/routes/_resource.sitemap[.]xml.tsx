import { generateSitemap } from "@nasa-gcn/remix-seo"
import { routes } from "@remix-run/dev/server-build"
import { type DataFunctionArgs } from "@remix-run/node"

import { getDomainUrl } from "~/utils/url.server"

export function loader({ request }: DataFunctionArgs) {
  return generateSitemap(request, routes, {
    siteUrl: getDomainUrl(request),
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}`,
    },
  })
}
