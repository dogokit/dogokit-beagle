import { Link } from "@remix-run/react"

import {
  IndicatorNoUser,
  IndicatorUser,
} from "~/components/shared/indicator-user"
import { Logo } from "~/components/shared/logo"
import { ThemeButton } from "~/components/shared/theme-button"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { cn } from "~/utils/cn"

export function SiteNavigation() {
  const { userSession } = useRootLoaderData()

  return (
    <nav
      className={cn(
        "sticky top-0 z-10 flex items-center justify-between gap-2 bg-background p-2 sm:p-4",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="block">
          <Logo text="DOGOKIT" />
        </Link>
        <ThemeButton />
      </div>

      {!userSession && <IndicatorNoUser />}
      {userSession && <IndicatorUser />}
    </nav>
  )
}
