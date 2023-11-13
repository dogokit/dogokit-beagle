import { type LoaderFunctionArgs } from "@remix-run/node"

import { Debug } from "~/components/shared/debug"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return null
}

export default function PostsRoute() {
  return (
    <div className="site-container">
      <header className="site-header">
        <h1>All Posts</h1>
        <h2>Various posts created by the users</h2>
      </header>

      <section className="site-section">
        <Debug>{""}</Debug>
      </section>
    </div>
  )
}
