import { Link, NavLink } from "@remix-run/react"

import { IndicatorUser } from "~/components/shared/indicator-user"
import { Logo } from "~/components/shared/logo"
import { ThemeButton } from "~/components/shared/theme-button"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
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
                        "font-heading inline-flex items-center gap-2 rounded-md px-2 py-1 font-semibold transition hover:bg-secondary",
                        isActive && "text-primary",
                      )
                    }
                  >
                    <Iconify icon={navItem.icon} />
                    <span>{navItem.text}</span>
                  </NavLink>
                </li>
              )
            })}
        </ul>

        <div>
          {userSession && (
            <div className="flex items-center gap-4">
              <ButtonLink to="/user/posts/new" size="sm">
                <Iconify icon="ph:plus-square-duotone" />
                <span>New Post</span>
              </ButtonLink>
              <IndicatorUser />
            </div>
          )}
          {!userSession && (
            <div className="flex items-center gap-2">
              <ButtonLink to="/login" variant="secondary" size="sm">
                <Iconify icon="ph:sign-in-duotone" />
                <span>Log In</span>
              </ButtonLink>
              <ButtonLink to="/signup" size="sm">
                <Iconify icon="ph:user-plus-duotone" />
                <span>Sign Up</span>
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
