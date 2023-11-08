import { Link } from "@remix-run/react"

import { Logo } from "~/components/shared/logo"
import { ThemeButton } from "~/components/shared/theme-button"
import { ButtonLink } from "~/components/ui/button-link"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { cn } from "~/utils/cn"
import { IndicatorUser } from "../shared/indicator-user"

export function AppNavigation() {
  const { userSession } = useRootLoaderData()

  return (
    <nav
      className={cn(
        "sticky top-0 z-10 flex items-center justify-between gap-2 border-b border-b-border bg-background p-2",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="block">
          <Logo />
        </Link>
        <ThemeButton size="xs" />
      </div>

      <div className="flex items-center gap-2">
        {userSession && <IndicatorUser size="sm" />}
        {!userSession && (
          <>
            <ButtonLink to="/logout" size="xs" variant="destructive">
              Log out
            </ButtonLink>
            <ButtonLink to="/" size="xs" prefetch="intent">
              Home
            </ButtonLink>
          </>
        )}
      </div>
    </nav>
  )
}
