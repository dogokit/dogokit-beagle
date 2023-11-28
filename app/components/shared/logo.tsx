import { Icon } from "@iconify/react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/utils/cn"

const logoVariants = cva("flex items-center gap-1 text-2xl font-semibold", {
  variants: {
    variant: {
      default: "",
      link: "",
    },
    size: {
      default: "",
      lg: "gap-2 text-4xl",
      xl: "gap-2 text-4xl sm:gap-4 sm:text-6xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const logoIconVariants = cva("", {
  variants: {
    size: {
      default: "-mt-1",
      lg: "-mt-2",
      xl: "-mt-2 sm:-mt-3",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface LogoProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof logoVariants> {
  text?: string
  classNameIcon?: string
}

export function Logo({
  variant,
  size,
  className,
  classNameIcon,
  text,
}: LogoProps) {
  return (
    <span className={cn(logoVariants({ variant, size, className }))}>
      <Icon
        icon="fluent-emoji-flat:dog-face"
        className={cn(logoIconVariants({ size, className: classNameIcon }))}
      />
      <span className="inline-flex flex-nowrap font-display">{text}</span>
    </span>
  )
}
