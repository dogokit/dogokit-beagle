import { type MetaFunction } from "@remix-run/react"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({ title: `Blank`, description: `Blank page` })

export default function BlankRoute() {
  return <p>Just a blank route.</p>
}
