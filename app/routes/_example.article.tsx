import { Icon } from "@iconify/react"
import { type MetaFunction } from "@remix-run/node"

import { Anchor } from "~/components/ui/anchor"

import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `Dogokit Article`,
    description: `🐶 Dogokit with 💿 Remix web app kit`,
  })

export default function ArticleRoute() {
  return (
    <div className="site-container space-y-28 py-20">
      <section className="site-section space-y-10">
        <h1 className="text-5xl sm:text-6xl">The Article</h1>
        <p className="text-2xl sm:text-4xl">Remix web app kit by Dogokit</p>
      </section>

      <section className="prose-config site-section">
        <h1 className="text-icon">
          <Icon icon="fluent-emoji-flat:cat-face" />
          <span>Heading One</span>
        </h1>
        <p>
          This is the paragraph after heading one. Discussing about{" "}
          <Anchor href="https://dogokit.allnimal.com">Dogokit</Anchor> and{" "}
          <Anchor href="https://remix.run">Remix</Anchor>.
        </p>
        <pre>console.log("Hello Inside 0123");</pre>

        <h2 className="text-icon">
          <Icon icon="fluent-emoji-flat:bear" />
          <span>Heading Two</span>
        </h2>
        <p>
          Just another paragraph after <b>heading two</b>. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Culpa commodi amet aliquid eos
          placeat maiores quas dolor iusto accusamus laudantium sit molestiae
          facilis labore ipsam odit sapiente ex, dolore quis?
        </p>

        <h3 className="text-icon">
          <Icon icon="fluent-emoji-flat:paw-prints" />
          <span>Heading Three</span>
        </h3>
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
