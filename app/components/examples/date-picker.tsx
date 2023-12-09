import { DatePicker } from "~/components/ui/date-picker"

export function ExampleDatePicker() {
  return (
    <div>
      <DatePicker
        defaultValue={String(new Date())}
        name="date-picker-example"
      />
    </div>
  )
}
