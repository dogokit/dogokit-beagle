import { useParams } from "@remix-run/react"
import { match } from "ts-pattern"
import { Button } from "~/components/ui/button"
import { DatePicker } from "~/components/ui/date-picker"

const renderComponent = (path: string) =>
  match(path)
    .with("button", () => <ComponentButton />)
    .with("date-picker", () => <ComponentDatePicker />)
    .otherwise(() => <p>No Component</p>)

export default function ComponentPathRoute() {
  const params = useParams()
  const componentPath = params.componentPath
  if (!componentPath) return null
  return renderComponent(componentPath)
}

function ComponentButton() {
  return (
    <div>
      <Button>Button</Button>
    </div>
  )
}

function ComponentDatePicker() {
  return (
    <div>
      <DatePicker
        defaultValue={String(new Date())}
        name="date-picker-example"
      />
    </div>
  )
}
