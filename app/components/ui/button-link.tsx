import { Link, type LinkProps } from "@remix-run/react"
import { type VariantProps } from "class-variance-authority"

import { Button, buttonVariants } from "~/components/ui/button"
import { cn } from "~/utils/cn"

interface ButtonLinkProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {
  disabled?: boolean
}

const ButtonLink = ({
  variant = "default",
  size = "default",
  className,
  children,
  disabled,
  ...props
}: ButtonLinkProps) => {
  return (
    <Link
      className={cn(
        buttonVariants({ variant, size, className }),
        disabled && "pointer-events-none opacity-50",
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
ButtonLink.displayName = "ButtonLink"

interface ButtonNavLinkProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {}

const ButtonNavLink = ({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: ButtonNavLinkProps) => {
  return (
    <Link
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Link>
  )
}
ButtonNavLink.displayName = "ButtonNavLink"

interface ButtonLinkIconProps
  extends LinkProps,
    VariantProps<typeof buttonVariants> {}

function ButtonChildLink({ ...props }: ButtonLinkIconProps) {
  return (
    <Button asChild>
      <Link {...props}>Back to Home</Link>
    </Button>
  )
}

export { ButtonChildLink, ButtonLink, ButtonNavLink }
