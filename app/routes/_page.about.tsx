import { type MetaFunction } from "@remix-run/node"

import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `About`,
    description: `About Dogokit Remix web app template kit`,
  })

export default function AboutRoute() {
  return (
    <div className="site-container">
      <header className="site-header">
        <h1>About</h1>
      </header>
    </div>
  )
}
