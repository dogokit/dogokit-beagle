import { DatePicker } from "~/components/ui/date-picker"
import { InputDate } from "~/components/ui/input-date"
import { formatDateYMD } from "~/utils/datetime"

export function ExampleDatePicker() {
  const today = new Date()

  return (
    <div className="max-w-xs space-y-8">
      <h2>Date Picker</h2>
      <div className="space-y-4">
        <InputDate className="w-full" />
        <InputDate className="w-full" defaultValue={formatDateYMD(today)} />
        <DatePicker
          className="w-full"
          name="date-picker-example"
          defaultValue={String(today)}
        />
      </div>
    </div>
  )
}
