import { type MetaFunction } from "@remix-run/node"

import { ContentIntro } from "~/components/contents/intro"
import { ContentStack } from "~/components/contents/stack"
import { ContentStart } from "~/components/contents/start"

import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `Dogokit`,
    description: `Web app template kit Using Remix, React, Tailwind CSS, and more`,
  })

export default function IndexRoute() {
  return (
    <div className="site-container space-y-10">
      <section className="site-section">
        <ContentIntro />
      </section>

      <section className="site-section">
        <ContentStack />
      </section>

      <section className="site-section">
        <ContentStart />
      </section>
    </div>
  )
}
