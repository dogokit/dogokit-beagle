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
import { formatDate } from "~/utils/datetime"

export function DatePicker(config: FieldConfig<string>) {
  const defaultDate =
    config.defaultValue && config.defaultValue !== "Invalid Date"
      ? new Date(config.defaultValue)
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
          required={config.required}
          name={config.name}
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
              "h-10 w-[280px] justify-start gap-2 p-2 text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            <Iconify icon="ph:calendar-blank" className="mr-2 h-4 w-4" />
            {date ? formatDate(date) : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate as any}
            initialFocus
            defaultMonth={date}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
