import { Link } from "@remix-run/react"

import { IconLinks } from "~/components/shared/icon-links"
import { Logo } from "~/components/shared/logo"
import { ThemeMenu } from "~/components/shared/theme-menu"
import { Anchor, type AnchorProps } from "~/components/ui/anchor"
import { configSite } from "~/configs/site"
import { configSitemapGroups } from "~/configs/sitemap"
import { cn } from "~/utils/cn"
import { getCurrentYear } from "~/utils/datetime"

export function SiteFooter() {
  return (
    <footer className="mt-40 space-y-4 p-4">
      <SiteFooterSectionSitemap isRounded />
      <SiteFooterSectionExtra isRounded />
    </footer>
  )
}

function SiteFooterSectionSitemap({
  isRounded = true,
}: {
  isRounded?: boolean
}) {
  return (
    <section className="flex flex-wrap gap-4">
      <div
        className={cn(
          "flex-auto space-y-8 bg-muted p-4",
          isRounded && "rounded-md",
        )}
      >
        <div className="space-y-4">
          <Link
            to="/"
            className="focus-ring inline-block rounded-xs transition hover:opacity-75"
          >
            <Logo text="Dogokit" classNameIcon="grayscale" />
          </Link>
          <p className="max-w-sm text-sm">{configSite.description}</p>
        </div>

        <IconLinks />

        <p className="text-xs">
          <span>&copy; {getCurrentYear()} </span>
          <span>{configSite.name}</span>
          <span>. All rights reserved.</span>
        </p>
      </div>

      <div className={cn("grow bg-muted p-4", isRounded && "rounded-md")}>
        <FooterSitemap />
      </div>
    </section>
  )
}

function SiteFooterSectionExtra({ isRounded = true }: { isRounded?: boolean }) {
  return (
    <section
      className={cn(
        "bg-muted p-4",
        "flex flex-col flex-wrap items-center justify-between gap-2 sm:flex-row",
        isRounded && "rounded-md",
      )}
    >
      <p className="text-center text-sm sm:text-left">
        <AnchorFooter href="https://github.com/dogokit">Dogokit</AnchorFooter>
        <span> is built by </span>
        <AnchorFooter href="https://github.com/mhaidarhanif">
          M Haidar Hanif
        </AnchorFooter>
        <span> from the </span>
        <AnchorFooter href="https://github.com/allnimal">
          Allnimal
        </AnchorFooter>{" "}
        group.
      </p>

      <ThemeMenu variant="ghost" />
    </section>
  )
}

function AnchorFooter({ href, children }: AnchorProps) {
  return (
    <Anchor href={href} className="focus-ring font-semibold">
      {children}
    </Anchor>
  )
}

/**
 * Can either using flexbox or grid
 */
function FooterSitemap() {
  return (
    <ul className="flex flex-wrap gap-8">
      {configSitemapGroups.map(group => (
        <li key={group.title} className="min-w-[140px] space-y-4">
          <h5>{group.title}</h5>

          <ul className="space-y-3 text-sm">
            {group.items.map(item => (
              <li key={item.to || item.url}>
                {item.url && (
                  <Anchor
                    href={item.url}
                    className="focus-ring text-muted-foreground transition hover:text-foreground"
                  >
                    {item.name}
                  </Anchor>
                )}
                {item.to && (
                  <Link
                    to={item.to}
                    className="focus-ring text-muted-foreground transition hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}
