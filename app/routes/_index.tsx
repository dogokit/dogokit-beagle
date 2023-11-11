import { type MetaFunction } from "@remix-run/node"

import { ContentIntro } from "~/components/contents/intro"
import { ContentQuickStart } from "~/components/contents/quick-start"
import { ContentTechStack } from "~/components/contents/tech-stack"

export const meta: MetaFunction = () => [
  { title: "Dogokit" },
  {
    name: "description",
    content: "Web app template kit Using Remix, React, Tailwind CSS, and more",
  },
]

export default function IndexRoute() {
  return (
    <div className="site-container space-y-10">
      <section className="site-section">
        <ContentIntro />
      </section>

      <section className="site-section">
        <ContentTechStack />
      </section>

      <section className="site-section">
        <ContentQuickStart />
      </section>
    </div>
  )
}
