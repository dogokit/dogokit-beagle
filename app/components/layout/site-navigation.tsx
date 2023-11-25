import { Link, NavLink } from "@remix-run/react"

import { IndicatorUser } from "~/components/shared/indicator-user"
import { Logo } from "~/components/shared/logo"
import { ThemeButton } from "~/components/shared/theme-button"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { configNavigationItems } from "~/configs/navigation"
import { configSite } from "~/configs/site"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { cn } from "~/utils/cn"

export function SiteNavigation() {
  return (
    <>
      <SiteNavigationSmall />
      <SiteNavigationLarge />
    </>
  )
}

export function SiteNavigationSmall() {
  const { userSession } = useRootLoaderData()

  return (
    <nav
      className={cn(
        "flex p-2 lg:hidden",
        "sticky top-0 z-10 items-center justify-between gap-2",
        "bg-background/50 backdrop-blur-lg backdrop-saturate-150",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="block transition hover:text-primary">
          <Logo text="Dogokit" />
        </Link>
        <ThemeButton />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-4">
          {userSession && (
            <>
              <ButtonLink to="/new" size="sm">
                <Iconify icon="ph:plus-square-duotone" />
                <span>New</span>
              </ButtonLink>
              <IndicatorUser size="sm" />
            </>
          )}

          {!userSession && (
            <ButtonLink to="/login" variant="secondary" size="sm">
              <Iconify icon="ph:sign-in-duotone" />
              <span>Log In</span>
            </ButtonLink>
          )}
        </div>
      </div>
    </nav>
  )
}

export function SiteNavigationLarge() {
  const { userSession } = useRootLoaderData()

  return (
    <nav
      className={cn(
        "hidden p-4 lg:flex",
        "sticky top-0 z-10 items-center justify-between gap-2",
        "transition duration-200 ease-in-out",
        "bg-background/50 backdrop-blur-lg backdrop-saturate-150",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Link to="/" className="block transition hover:text-primary">
          <Logo text="Dogokit" />
        </Link>
        <ThemeButton />
      </div>

      <div className="flex items-center gap-4">
        <ul className="flex items-center gap-4">
          {configNavigationItems
            .filter(item => configSite.navItems.includes(item.to))
            .filter(navItem => navItem.isEnabled)
            .map(navItem => (
              <li key={navItem.to}>
                <NavLink
                  to={navItem.to}
                  className={({ isActive }) =>
                    cn(
                      "inline-flex items-center gap-2 rounded-md px-2 py-1 font-heading font-semibold transition hover:bg-secondary",
                      isActive && "text-primary",
                    )
                  }
                >
                  <Iconify icon={navItem.icon} />
                  <span>{navItem.text}</span>
                </NavLink>
              </li>
            ))}
        </ul>

        <div>
          {userSession && (
            <div className="flex items-center gap-4">
              <ButtonLink to="/new" size="sm">
                <Iconify icon="ph:plus-square-duotone" />
                <span>New</span>
              </ButtonLink>
              <IndicatorUser size="sm" />
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
