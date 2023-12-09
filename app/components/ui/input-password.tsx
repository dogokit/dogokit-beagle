import { useState } from "react"

import { Button } from "~/components/ui/button"
import { Iconify } from "~/components/ui/iconify"
import { Input, type InputProps } from "~/components/ui/input"
import { cn } from "~/utils/cn"

export function InputPassword({
  placeholder = "Enter password",
  className,
  ...props
}: InputProps) {
  const [isShown, setIsShown] = useState<boolean>(false)

  function handleClick() {
    setIsShown(!isShown)
  }

  return (
    <div className="relative">
      <Input
        type={isShown ? "text" : "password"}
        placeholder={placeholder}
        className={cn(className)}
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
