import { type MetaFunction } from "@remix-run/node"

import { Logo } from "~/components/shared/logo"

export const meta: MetaFunction = () => [
  { title: "Dogokit Remix" },
  { name: "description", content: "🐶 Dogokit Remix demo app." },
]

export default function IndexRoute() {
  return (
    <div className="site-container space-y-20 py-20">
      <section className="site-section">
        <Logo text="Dogokit Remix" size="xl" />
      </section>

      <section className="prose-config site-section">
        <h2>What is this?</h2>
        <p>Dogokit Remix is a Remix web app template kit.</p>
        <p>
          The goal is to be as productive as possible to ship a web app quickly
          with Remix full stack web framework. So it is a highly opinionated
          collection of application structure, software engineering and web
          development workflow, interactive UI components, functionality hooks
          and utilities.
        </p>

        <h2>Who build it?</h2>
        <p>M Haidar Hanif</p>
      </section>
    </div>
  )
}
