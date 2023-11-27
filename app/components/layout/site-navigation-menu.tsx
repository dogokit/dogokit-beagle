import { NavLink, useNavigate, type NavLinkProps } from "@remix-run/react"
import { useState } from "react"

import { Logo } from "~/components/shared/logo"
import { Button } from "~/components/ui/button"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "~/components/ui/sheet"
import { configNavigationItems, type NavItem } from "~/configs/navigation"
import { configSite } from "~/configs/site"
import { cn } from "~/utils/cn"

export function SiteNavigationMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <Iconify icon="ph:list" />
          <span className="hidden sm:inline">Menu</span>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader className="flex items-center gap-2">
          <NavLinkMenu
            to="/"
            onOpenChange={setOpen}
            className="hover:text-primary"
          >
            <Logo text="Dogokit" className="p-2" />
          </NavLinkMenu>
        </SheetHeader>

        <ul className="mt-8 space-y-4">
          {configNavigationItems
            .filter(item => configSite.navItems.includes(item.to))
            .filter(navItem => navItem.isEnabled)
            .map(navItem => (
              <NavItemLinkMenu
                key={navItem.to}
                onOpenChange={setOpen}
                navItem={navItem}
              />
            ))}
        </ul>

        <div className="mt-8 flex items-center gap-2">
          <ButtonLink
            to="/login"
            variant="secondary"
            size="sm"
            onClick={() => {
              navigate("/login")
              setOpen?.(false)
            }}
          >
            <Iconify icon="ph:sign-in-duotone" />
            <span>Log In</span>
          </ButtonLink>
          <ButtonLink
            to="/signup"
            size="sm"
            onClick={() => {
              navigate("/signup")
              setOpen?.(false)
            }}
          >
            <Iconify icon="ph:user-plus-duotone" />
            <span>Sign Up</span>
          </ButtonLink>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function NavLinkMenu({
  to,
  onOpenChange,
  className,
  children,
  ...props
}: NavLinkProps & {
  onOpenChange: (open: boolean) => void
}) {
  const navigate = useNavigate()

  return (
    <NavLink
      to={to}
      onClick={() => {
        navigate(to.toString())
        onOpenChange?.(false)
      }}
      className={cn("focus-ring", className)}
      {...props}
    >
      {children}
    </NavLink>
  )
}

export function NavItemLinkMenu({
  onOpenChange,
  navItem,
}: {
  onOpenChange: (open: boolean) => void
  navItem: NavItem
}) {
  const navigate = useNavigate()

  return (
    <li>
      <NavLink
        to={navItem.to}
        onClick={() => {
          navigate(navItem.to.toString())
          onOpenChange?.(false)
        }}
        className={({ isActive }) =>
          cn(
            "focus-ring",
            "inline-flex items-center gap-2 rounded-md px-2 py-1 font-heading font-semibold transition hover:bg-secondary",
            isActive && "text-primary",
          )
        }
      >
        <Iconify icon={navItem.icon} />
        <span>{navItem.text}</span>
      </NavLink>
    </li>
  )
}
