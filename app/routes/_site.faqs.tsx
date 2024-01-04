import { type MetaFunction } from "@remix-run/react"

import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({ title: `FAQ`, description: `Frequently asked questions` })

export default function FAQsRoute() {
  return <p>FAQs.</p>
}
