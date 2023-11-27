import { Link } from "@remix-run/react"
import { IconLinks } from "~/components/shared/icon-links"
import { Logo } from "~/components/shared/logo"
import { ThemeMenu } from "~/components/shared/theme-menu"
import { configSite } from "~/configs/site"
import { cn } from "~/utils/cn"
import { getCurrentYear } from "~/utils/datetime"

export function SiteFooter({ isRounded = true }: { isRounded: boolean }) {
  return (
    <footer
      className={cn(
        "space-y-10 bg-secondary",
        isRounded && "m-2 mt-10 rounded-md p-4 sm:m-4 sm:mt-20",
      )}
    >
      <section className="flex justify-between gap-10">
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

        <SiteFooterSitemap />
      </section>

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
    </footer>
  )
}

export function SiteFooterSitemap() {
  return <div>Sitemap</div>
}
