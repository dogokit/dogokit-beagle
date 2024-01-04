import { json, type MetaFunction } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import { Anchor } from "~/components/ui/anchor"
import { configRedirects } from "~/configs/redirects"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"
import { pluralizeWord } from "~/utils/string"

export const handle = createSitemap("/redirects", 0.1)

export const meta: MetaFunction = () =>
  createMeta({
    title: `Redirects`,
    description: `List of redirect pages`,
  })

export const loader = () => {
  const redirects = configRedirects
  return json({ redirects })
}

export default function RedirectsRoute() {
  const { redirects } = useLoaderData<typeof loader>()

  return (
    <div className="site-container">
      <section className="site-section prose-config">
        <h4>Redirects</h4>
        <p>
          {pluralizeWord("path", redirects.length)} redirect paths to URLs and
          other pages.
        </p>
        <ul>
          {redirects.map(redirectItem => (
            <li key={redirectItem.path}>
              <Link to={redirectItem.path}>
                <code>{redirectItem.path}</code>
              </Link>

              <span className="text-muted-foreground"> &rarr; </span>

              {redirectItem.url && (
                <Anchor href={redirectItem.url}>
                  <code>{redirectItem.url}</code>
                </Anchor>
              )}
              {redirectItem.to && (
                <Link to={redirectItem.to}>
                  <code>{redirectItem.to}</code>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
