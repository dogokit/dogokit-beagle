import { type MetaFunction } from "@remix-run/node"

import { Anchor } from "~/components/ui/anchor"
import { Iconify } from "~/components/ui/iconify"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `About`,
    description: `About Dogokit Remix web app template kit`,
  })

export default function AboutRoute() {
  return (
    <div className="site-container space-y-12">
      <header className="site-header">
        <h1 className="inline-flex items-center gap-2 text-primary">
          <Iconify icon="ph:info-duotone" />
          <span>About</span>
        </h1>
      </header>

      <section className="site-section prose-config">
        <h1 className="inline-flex items-center gap-2">The story of Dogokit</h1>
        <p>
          This is the paragraph after heading one. Discussing about{" "}
          <Anchor href="https://dogokit.allnimal.com">Dogokit</Anchor> and{" "}
          <Anchor href="https://remix.run">Remix</Anchor>.
        </p>
        <pre>console.log("Hello Inside 0123");</pre>

        <h2 className="inline-flex items-center gap-2">Heading Two</h2>
        <p>
          Just another paragraph after <b>heading two</b>. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Culpa commodi amet aliquid eos
          placeat maiores quas dolor iusto accusamus laudantium sit molestiae
          facilis labore ipsam odit sapiente ex, dolore quis?
        </p>

        <h3 className="inline-flex items-center gap-2">Heading Three</h3>
        <p>
          The last paragraph after <i>heading three</i>. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Culpa commodi amet aliquid eos
          placeat maiores quas dolor iusto accusamus laudantium sit molestiae
          facilis labore ipsam odit sapiente ex, dolore quis?
        </p>
      </section>
    </div>
  )
}
