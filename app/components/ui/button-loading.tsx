import { type VariantProps } from "class-variance-authority"
import * as React from "react"

import { Iconify } from "~/components/libs/icon"
import { Button, type buttonVariants } from "~/components/ui/button"

// https://reactrouter.com/en/6.14.2/hooks/use-navigation
interface ButtonLoadingProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading: boolean
  loadingText: React.ReactNode
  isDisabledWhenLoading?: boolean
  iconComponent?: React.ReactNode
}

const ButtonLoading = React.forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      isDisabledWhenLoading = true,
      isLoading = false,
      loadingText = "",
      iconComponent,
      children,
      ...props
    },
    ref,
  ) => {
    const isActive = isDisabledWhenLoading ? isLoading : isDisabledWhenLoading

    return (
      <Button ref={ref} disabled={isActive} {...props}>
        {iconComponent && iconComponent}
        {!iconComponent && isActive && (
          <Iconify icon="ph:spinner-gap" className="animate-spin" />
        )}
        {isLoading ? loadingText : children}
      </Button>
    )
  },
)
ButtonLoading.displayName = "ButtonLoading"

export { ButtonLoading }
