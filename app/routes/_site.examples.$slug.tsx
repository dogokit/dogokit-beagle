import { useParams } from "@remix-run/react"
import { match } from "ts-pattern"

import { ExampleButton } from "~/components/examples/button"
import { ExampleDatePicker } from "~/components/examples/date-picker"
import { ExampleInput } from "~/components/examples/input"
import { ExampleTiptap } from "~/components/examples/tiptap"
import { ExampleUploadcare } from "~/components/examples/uploadcare"

export default function ExamplesSlugRoute() {
  const { slug } = useParams()
  if (!slug) return null
  return renderComponent(slug)
}

const renderComponent = (slug: string) =>
  match(slug)
    .with("button", () => <ExampleButton />)
    .with("input", () => <ExampleInput />)
    .with("date-picker", () => <ExampleDatePicker />)
    .with("tiptap", () => <ExampleTiptap />)
    .with("uploadcare", () => <ExampleUploadcare />)
    .otherwise(() => <p>No Component</p>)
