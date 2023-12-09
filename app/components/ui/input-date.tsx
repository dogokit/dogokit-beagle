import { Iconify } from "~/components/ui/iconify"
import { Input, type InputProps } from "~/components/ui/input"
import { cn } from "~/utils/cn"

export function InputDate({ className, ...props }: InputProps) {
  return (
    <div className="relative">
      <Input type="date" className={cn(className)} {...props} />
      <Iconify
        icon="ph:calendar-blank"
        className={cn(
          "pointer-events-none absolute inset-y-0 right-0 my-2 mr-3 flex h-5 w-5",
        )}
      />
    </div>
  )
}
