import { type MetaFunction } from "@remix-run/node"

import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap("/terms", 0.1)

export const meta: MetaFunction = () =>
  createMeta({
    title: `Terms of Service`,
    description: `Terms of Service`,
  })

export default function TermsRoute() {
  return (
    <div className="site-container">
      <header className="site-section">
        <h1>Terms of Service</h1>
      </header>
    </div>
  )
}
