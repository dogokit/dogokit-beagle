import { Link, type LinkProps } from "@remix-run/react"

import { cn } from "~/utils/cn"

/**
 * Remix Link + Text
 *
 * Re-export Link and NavLink component from Remix.
 * Also Link Text and NavLink Text with some default styles.
 */

interface LinkTextProps extends LinkProps {
  disabled?: boolean
}

export function LinkText({ to = "/", disabled = false, children, className }: LinkTextProps) {
  return (
    <Link
      to={to}
      className={cn(
        "prose-a-styles font-semibold",
        disabled && "cursor-not-allowed opacity-75",
        className,
      )}
    >
      {children}
    </Link>
  )
}
