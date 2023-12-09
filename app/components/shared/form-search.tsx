import { Form, useSearchParams } from "@remix-run/react"

import { Iconify } from "~/components/ui/iconify"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

export function FormSearch({
  action = "/search",
  placeholder = "Search...",
}: {
  action?: string
  placeholder?: string
}) {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") ?? ""

  return (
    <Form method="GET" action={action} className="w-full">
      <fieldset className="group relative flex items-center gap-1">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          type="search"
          name="q"
          placeholder={placeholder}
          defaultValue={query}
          autoFocus
          autoComplete="off"
          className="w-full py-2 pe-3 ps-10"
        />
        <span className="pointer-events-none absolute flex ps-3">
          <Iconify
            icon="ph:magnifying-glass"
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="text-muted-foreground group-focus-within:text-primary"
          />
        </span>
      </fieldset>
    </Form>
  )
}
