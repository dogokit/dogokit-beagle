import { type MetaFunction } from "@remix-run/node"

import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `Help`,
    description: `Get help or support`,
  })

export default function HelpRoute() {
  return (
    <div className="site-container">
      <header className="site-section">
        <h1>Help</h1>
      </header>
    </div>
  )
}
