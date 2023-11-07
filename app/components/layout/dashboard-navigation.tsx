import { Link } from "@remix-run/react"

import { ThemeButton } from "~/components/shared/theme-button"
import { ButtonLink } from "~/components/ui/button-link"
import { cn } from "~/utils/cn"

export function DashboardNavigation() {
  return (
    <nav
      className={cn(
        "sticky top-0 z-10",
        "flex items-center justify-between gap-2",
        "p-2",
        "bg-background",
        "border-b border-b-border",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="block">
          Home
        </Link>
        <ThemeButton size="sm" />
      </div>

      <div className="flex items-center justify-between gap-2">
        <ButtonLink to="/logout" size="sm">
          Log Out
        </ButtonLink>
      </div>
    </nav>
  )
}
