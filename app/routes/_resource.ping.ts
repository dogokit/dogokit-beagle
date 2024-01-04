import { json } from "@remix-run/node"

import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export function loader() {
  return json("Ping")
}
