import { type MetaFunction } from "@remix-run/node"
import { ContentInspirations } from "~/components/contents/inspirations"
import { ContentIntro } from "~/components/contents/intro"
import { ContentStack } from "~/components/contents/stack"
import { ContentStart } from "~/components/contents/start"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap("/", 1)

export const meta: MetaFunction = () =>
  createMeta({
    title: "Dogokit",
    description:
      "Web app template kit using Remix, React, Tailwind CSS, Radix UI, Prisma ORM, and more.",
  })

export default function IndexRoute() {
  return (
    <div className="site-container space-y-12">
      <section className="site-section">
        <ContentIntro />
      </section>

      <section className="site-section">
        <ContentStack />
      </section>

      <section className="site-section">
        <ContentStart />
      </section>

      <section className="site-section">
        <ContentInspirations />
      </section>
    </div>
  )
}
