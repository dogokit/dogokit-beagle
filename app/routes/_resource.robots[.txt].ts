import { generateRobotsTxt } from "@nasa-gcn/remix-seo"
import { type LoaderFunctionArgs } from "@remix-run/node"

import { getDomainUrl } from "~/utils/url.server"

export function loader({ request }: LoaderFunctionArgs) {
  return generateRobotsTxt([
    { type: "sitemap", value: `${getDomainUrl(request)}/sitemap.xml` },
    { type: "disallow", value: "/user" },
    { type: "disallow", value: "/admin" },
    { type: "disallow", value: "/owner" },
  ])
}
