import { IconMatch } from "~/components/libs/icon"
import { Input, type InputProps } from "~/components/ui/input"
import { cn } from "~/utils/cn"

export function InputDate({ className, ...props }: InputProps) {
  return (
    <div className="relative">
      <Input type="date" className={cn(className)} {...props} />
      <IconMatch
        icon="calendar-blank"
        className={cn("pointer-events-none absolute inset-y-0 right-0 my-2 mr-3 flex size-5")}
      />
    </div>
  )
}
