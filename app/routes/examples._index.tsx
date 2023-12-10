import { ExampleButton } from "~/components/examples/button"
import { ExampleDatePicker } from "~/components/examples/date-picker"
import { ExampleInput } from "~/components/examples/input"

export default function ExamplesIndexRoute() {
  return (
    <div className="space-y-8">
      <ExampleButton />
      <ExampleInput />
      <ExampleDatePicker />
    </div>
  )
}
