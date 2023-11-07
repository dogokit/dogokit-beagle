import { type MetaFunction } from "@remix-run/node"

export const meta: MetaFunction = () => [
  { title: "Dogokit Remix" },
  { name: "description", content: "🐶 Dogokit Remix demo app." },
]

export default function IndexRoute() {
  return (
    <div className="site-container space-y-20 py-20">
      <section className="site-section space-y-10">
        <h1>Dogokit Remix is a web app template kit</h1>
        <h2>Using Remix, React, Tailwind CSS, and more</h2>
      </section>

      <section className="prose-config site-section">
        <p>
          The goal is to be as productive as possible to ship a web app quickly
          with Remix full stack web framework. So it is a highly opinionated
          collection of application structure, software engineering and web
          development workflow, interactive UI components, functionality hooks
          and utilities.
        </p>
      </section>
    </div>
  )
}
