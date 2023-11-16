import { type MetaFunction } from "@remix-run/node"

import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap("/privacy", 0.1)

export const meta: MetaFunction = () =>
  createMeta({
    title: `Privacy Policy`,
    description: `Privacy Policy list`,
  })

export default function PrivacyRoute() {
  return (
    <div className="site-container">
      <header className="site-section">
        <h1>Privacy of Service</h1>
      </header>
    </div>
  )
}
