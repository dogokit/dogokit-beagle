import * as React from "react"
import { useState } from "react"

import { Button } from "~/components/ui/button"
import { Iconify } from "~/components/ui/iconify"
import { cn } from "~/utils/cn"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        className={cn(
          "flex h-9 w-full rounded border-2 border-input bg-background px-3 py-1 text-sm transition-colors placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          "focus:border-brand focus:outline-none focus:ring focus:ring-emerald-500/20",
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

function InputPassword({
  placeholder = "Enter password",
  className,
  ...props
}: InputProps) {
  const [isShown, setIsShown] = useState<boolean>(false)

  function handleClick() {
    setIsShown(!isShown)
  }

  return (
    <div className={cn("relative", className)}>
      <Input
        type={isShown ? "text" : "password"}
        placeholder={placeholder}
        {...props}
      />
      <Button
        size="xs"
        type="button"
        variant="secondary"
        onClick={handleClick}
        className="absolute inset-y-0 right-0 my-1.5 me-1.5 flex w-20 gap-2"
      >
        {isShown ? (
          <Iconify icon="ph:eye-slash-duotone" />
        ) : (
          <Iconify icon="ph:eye-duotone" />
        )}
        <span className="text-xs">{isShown ? "Hide" : "Show"}</span>
      </Button>
    </div>
  )
}

export { Input, InputPassword }
