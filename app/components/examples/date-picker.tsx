import { DatePicker } from "~/components/ui/date-picker"
import { formatDateYMD } from "~/utils/datetime"
import { InputDate } from "../ui/input-date"

export function ExampleDatePicker() {
  const today = new Date()

  return (
    <div className="max-w-[280px] space-y-4">
      <InputDate defaultValue={formatDateYMD(today)} />
      <DatePicker defaultValue={String(today)} name="date-picker-example" />
    </div>
  )
}
