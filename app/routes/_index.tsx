import { ContentInspirations } from "~/components/contents/inspirations"
import { ContentIntro } from "~/components/contents/intro"
import { ContentStack } from "~/components/contents/stack"
import { ContentStart } from "~/components/contents/start"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap("/", 1)

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

      <section className="site-section">
        <ContentInspirations />
      </section>
    </div>
  )
}
