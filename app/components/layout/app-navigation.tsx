import { Link } from "@remix-run/react"

import { IndicatorUser } from "~/components/shared/indicator-user"
import { Logo } from "~/components/shared/logo"
import { ThemeButton } from "~/components/shared/theme-button"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { cn } from "~/utils/cn"

export function AppNavigation() {
  const { userSession } = useRootLoaderData()

  return (
    <nav
      className={cn(
        "sticky top-0 z-20 flex items-center justify-between gap-2 border-b border-b-border bg-background p-2",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Link
          to="/"
          className="focus-ring block rounded-xs transition hover:opacity-75"
        >
          <Logo />
        </Link>

        <ThemeButton size="xs" />
      </div>

      <div>
        {userSession && (
          <div className="flex items-center gap-2">
            <ButtonLink to="/new" size="xs">
              <Iconify icon="ph:plus" />
              <span>New</span>
            </ButtonLink>
            <IndicatorUser size="xs" />
          </div>
        )}

        {!userSession && (
          <div className="flex items-center gap-2">
            <ButtonLink to="/logout" size="xs" variant="destructive">
              Log out
            </ButtonLink>
            <ButtonLink to="/" size="xs" prefetch="intent">
              Home
            </ButtonLink>
          </div>
        )}
      </div>
    </nav>
  )
}
