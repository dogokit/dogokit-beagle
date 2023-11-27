import { Link } from "@remix-run/react"

import { IconLinks } from "~/components/shared/icon-links"
import { Logo } from "~/components/shared/logo"
import { ThemeMenu } from "~/components/shared/theme-menu"
import { Anchor, type AnchorProps } from "~/components/ui/anchor"
import { configSite } from "~/configs/site"
import { cn } from "~/utils/cn"
import { getCurrentYear } from "~/utils/datetime"

export function SiteFooter() {
  return (
    <footer className="mt-10">
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
    <section
      className={cn(
        "space-y-10 bg-secondary",
        isRounded && "m-2 rounded-md p-4 sm:m-4 sm:mt-20",
      )}
    >
      <div className="flex justify-between gap-10">
        <div className="space-y-4 text-muted-foreground">
          <Link
            to="/"
            className="focus-ring inline-block transition hover:opacity-75"
          >
            <Logo text="Dogokit" classNameIcon="grayscale" />
          </Link>
          <p className="max-w-sm text-sm">{configSite.description}</p>
          <IconLinks />
        </div>

        <FooterSitemap />
      </div>
      <div className="flex items-end justify-between gap-2">
        <p className="text-xs text-muted-foreground">
          <span>&copy; {getCurrentYear()} </span>
          <Link to="/" className="focus-ring">
            {configSite.name}
          </Link>
          <span>. All rights reserved.</span>
        </p>

        <ThemeMenu />
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
        "space-y-10 bg-foreground text-background",
        isRounded && "m-2 rounded-md p-4 sm:m-4",
      )}
    >
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
    </section>
  )
}

export function FooterSitemap() {
  return <div>Sitemap</div>
}

export function AnchorFooter({ href, children }: AnchorProps) {
  return (
    <Anchor href={href} className="focus-ring font-semibold">
      {children}
    </Anchor>
  )
}
