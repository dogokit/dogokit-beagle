import { Link, NavLink } from "@remix-run/react"

import { IndicatorUser } from "~/components/shared/indicator-user"
import { Logo } from "~/components/shared/logo"
import { ThemeButton } from "~/components/shared/theme-button"
import { ButtonLink } from "~/components/ui/button-link"
import { configSite } from "~/configs/site"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { cn } from "~/utils/cn"

export function SiteNavigation() {
  const { userSession } = useRootLoaderData()

  return (
    <nav
      className={cn(
        "sticky top-0 z-10 flex items-center justify-between gap-2 p-2",
        "bg-background/30 backdrop-blur-xl backdrop-saturate-200",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="block">
          <Logo text="DOGOKIT" />
        </Link>
        <ThemeButton />
      </div>

      <div className="flex items-center gap-4">
        <ul className="flex items-center gap-4">
          {configSite.navItems
            .filter(navItem => navItem.isEnabled)
            .map(navItem => {
              return (
                <li key={navItem.to}>
                  <NavLink
                    to={navItem.to}
                    className={({ isActive }) =>
                      cn(
                        isActive && "text-primary",
                        "font-heading rounded-md px-3 py-2 font-semibold transition hover:bg-secondary",
                      )
                    }
                  >
                    {navItem.text}
                  </NavLink>
                </li>
              )
            })}
        </ul>

        <div className="flex items-center gap-2">
          {userSession && <IndicatorUser />}
          {!userSession && (
            <>
              <ButtonLink to="/login" variant="secondary">
                Log In
              </ButtonLink>
              <ButtonLink to="/signup">Sign Up</ButtonLink>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
