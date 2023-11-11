import { type MetaFunction } from "@remix-run/node"

import { createMeta } from "~/utils/meta"

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
