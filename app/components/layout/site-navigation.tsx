import { Link } from "@remix-run/react"

import { Logo } from "~/components/shared/logo"
import { ThemeButton } from "~/components/shared/theme-button"
import { ButtonLink } from "~/components/ui/button-link"
import { cn } from "~/utils/cn"

export function SiteNavigation() {
  return (
    <nav
      className={cn(
        "sticky top-0 z-10",
        "flex items-center justify-between gap-2",
        "p-2 sm:p-4",
        "bg-background",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="block">
          <Logo />
        </Link>
        <ThemeButton />
      </div>

      <div className="flex items-center justify-between gap-2">
        <ButtonLink to="/login">Log In</ButtonLink>
      </div>
    </nav>
  )
}
