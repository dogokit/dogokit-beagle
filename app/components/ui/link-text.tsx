import { Link, NavLink, type LinkProps } from "@remix-run/react"

import { cn } from "~/utils/cn"

/**
 * Remix Link + Text
 *
 * Reexport Link and NavLink component from Remix.
 * Also Link Text and NavLink Text with some default styles.
 */

interface Props extends LinkProps {
  disabled?: boolean
}

export function LinkText({ to, children, disabled, className }: Props) {
  return (
    <Link
      to={to}
      className={cn(
        "underline",
        disabled && "cursor-not-allowed opacity-75",
        className,
      )}
    >
      {children}
    </Link>
  )
}

export function NavLinkText({ to, children, disabled, className }: Props) {
  return (
    <NavLink
      to={to}
      className={cn(disabled && "cursor-not-allowed opacity-75", className)}
      end
    >
      {children}
    </NavLink>
  )
}
