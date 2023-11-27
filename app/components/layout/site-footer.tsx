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
    <footer className="mt-10 space-y-2 p-2 sm:space-y-4 sm:p-4">
      <SiteFooterSectionSitemap isRounded />
      <SiteFooterSectionExtra isRounded />
    </footer>
  )
}

export function SiteFooterSectionSitemap({
  isRounded = true,
}: {
  isRounded?: boolean
}) {
  return (
    <section className="flex flex-wrap gap-2 sm:gap-4">
      <div
        className={cn(
          "flex-auto space-y-8 bg-secondary p-4",
          isRounded && "rounded-md",
        )}
      >
        <div className="space-y-4">
          <Link
            to="/"
            className="focus-ring inline-block transition hover:opacity-75"
          >
            <Logo
              text="Dogokit"
              className="text-muted-foreground"
              classNameIcon="grayscale"
            />
          </Link>
          <p className="max-w-sm text-sm">{configSite.description}</p>
        </div>

        <div className="space-y-2">
          <h6>Follow and join with us</h6>
          <IconLinks />
        </div>
        <p className="text-xs">
          <span>&copy; {getCurrentYear()} </span>
          <Link to="/" className="focus-ring">
            {configSite.name}
          </Link>
          <span>. All rights reserved.</span>
        </p>
      </div>

      <div className={cn("grow bg-secondary p-4", isRounded && "rounded-md")}>
        <div>
          <FooterSitemap />
        </div>
      </div>
    </section>
  )
}

export function SiteFooterSectionExtra({
  isRounded = true,
}: {
  isRounded?: boolean
}) {
  return (
    <section
      className={cn(
        "bg-secondary p-4",
        "flex flex-col flex-wrap items-center justify-between gap-2 sm:flex-row",
        isRounded && "rounded-md",
      )}
    >
      <p>
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

export function AnchorFooter({ href, children }: AnchorProps) {
  return (
    <Anchor href={href} className="focus-ring font-semibold">
      {children}
    </Anchor>
  )
}

/**
 * Can either using flexbox or grid
 */
export function FooterSitemap() {
  return (
    <ul className="flex flex-wrap gap-8">
      {configSitemapGroups.map(group => (
        <li key={group.title} className="min-w-[140px] space-y-2">
          <h5>{group.title}</h5>

          <ul className="space-y-2 text-sm">
            {group.items.map(item => (
              <li key={item.to || item.url}>
                {item.url && (
                  <Anchor
                    href={item.url}
                    className="focus-ring hover:underline"
                  >
                    {item.name}
                  </Anchor>
                )}
                {item.to && (
                  <Link to={item.to} className="focus-ring hover:underline">
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
