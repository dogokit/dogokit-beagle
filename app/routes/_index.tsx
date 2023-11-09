import { type MetaFunction } from "@remix-run/node"
import { TechStackSection } from "~/components/contents/tech-stack"

export const meta: MetaFunction = () => [
  { title: "Dogokit Remix" },
  { name: "description", content: "🐶 Dogokit Remix demo app." },
]

export default function IndexRoute() {
  return (
    <div className="site-container space-y-10">
      <header className="site-section space-y-10">
        <h1>Dogokit Remix is a web app template kit</h1>
        <h2>Using Remix, React, Tailwind CSS, and more</h2>
      </header>

      <section className="prose-config site-section">
        <p>
          The goal is to be as productive as possible to ship a web app quickly
          with Remix full stack web framework. So it is a highly opinionated
          collection of application structure, software engineering and web
          development workflow, interactive UI components, 3rd party services,
          functionality hooks and utilities.
        </p>
      </section>

      <TechStackSection />
    </div>
  )
}
