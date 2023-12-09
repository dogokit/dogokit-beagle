import { useInputEvent, type FieldConfig } from "@conform-to/react"
import { useRef, useState } from "react"

import { Button } from "~/components/ui/button"
import { Calendar } from "~/components/ui/calendar"
import { Iconify } from "~/components/ui/iconify"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { cn } from "~/utils/cn"
import { formatDateDMY } from "~/utils/datetime"

export function DatePicker({
  className,
  ...props
}: {
  className: string
} & FieldConfig<string>) {
  const defaultDate =
    props.defaultValue && props.defaultValue !== "Invalid Date"
      ? new Date(props.defaultValue)
      : new Date()

  const [date, setDate] = useState<Date>(defaultDate)
  const shadowInputRef = useRef<HTMLInputElement>(null)

  const control = useInputEvent({
    ref: shadowInputRef,
    onFocus: () => shadowInputRef.current?.focus(),
    onReset: () => setDate(defaultDate),
  })

  return (
    <div>
      <Popover>
        <input
          type="hidden"
          required={props.required}
          name={props.name}
          value={String(date)}
          onChange={event => {
            control.change(event.target.value)
            setDate(new Date(event.target.value))
          }}
        />

        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-9 justify-start gap-2 border-input p-2 text-left font-normal",
              !date && "text-muted-foreground",
              className,
            )}
          >
            <Iconify icon="ph:calendar-blank" className="h-5 w-5" />
            {date ? formatDateDMY(date) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            initialFocus
            mode="single"
            selected={date}
            onSelect={setDate as any}
            defaultMonth={date}
            yearPast={5}
            yearFuture={5}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
