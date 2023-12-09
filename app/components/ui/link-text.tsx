import { Link, type LinkProps } from "@remix-run/react"

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
        "prose-a-styles",
        disabled && "cursor-not-allowed opacity-75",
        className,
      )}
    >
      {children}
    </Link>
  )
}
