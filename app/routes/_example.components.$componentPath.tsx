import { useParams } from "@remix-run/react"
import { match } from "ts-pattern"

import { ExampleButton } from "~/components/examples/button"
import { ExampleDatePicker } from "~/components/examples/date-picker"
import { ExampleInput } from "~/components/examples/input"

export default function ComponentPathRoute() {
  const params = useParams()
  const componentPath = params.componentPath
  if (!componentPath) return null
  return renderComponent(componentPath)
}

const renderComponent = (path: string) =>
  match(path)
    .with("button", () => <ExampleButton />)
    .with("input", () => <ExampleInput />)
    .with("date-picker", () => <ExampleDatePicker />)
    .otherwise(() => <p>No Component</p>)
