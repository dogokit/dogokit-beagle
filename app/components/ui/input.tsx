import * as React from "react"

import { cn } from "~/utils/cn"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm",
          "transition-colors placeholder:text-muted-foreground/30 disabled:cursor-not-allowed disabled:opacity-50",
          "focus:border-primary focus:outline-none focus:ring focus:ring-ring/20",
          "autofill:shadow-fill-background autofill:text-fill-foreground",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }
