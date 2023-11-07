import { type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "~/utils/cn"
import { buttonVariants } from "./button"
import { Iconify } from "./iconify"

// https://reactrouter.com/en/6.14.2/hooks/use-navigation
export interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isSubmitting?: boolean
  submittingText?: React.ReactNode
  isLoading?: boolean
  loadingText?: React.ReactNode
  isDisabledWhenLoading?: boolean
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      type = "submit",
      variant = "default",
      size = "default",
      className,
      name,
      value,
      isSubmitting = false,
      submittingText = "",
      isLoading = false,
      loadingText = "",
      isDisabledWhenLoading = true,
      children,
      ...props
    },
    ref,
  ) => {
    const isActive = isDisabledWhenLoading
      ? isSubmitting || isLoading
      : isDisabledWhenLoading

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), "flex")}
        type={type}
        ref={ref}
        name={name}
        value={value}
        disabled={isActive}
        {...props}
      >
        {isActive && <Iconify icon="fe:loading" className="animate-spin" />}
        {isSubmitting ? submittingText : isLoading ? loadingText : children}
      </button>
    )
  },
)
ButtonLoading.displayName = "ButtonLoading"

export { ButtonLoading }
