import { Form, useSearchParams } from "@remix-run/react"

import { Iconify } from "~/components/ui/iconify"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"

interface Props {
  action: string
  placeholder: string
}

export function SearchForm({ action, placeholder }: Props) {
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
          autoComplete="off"
          className="block h-12 w-full px-3 py-2 ps-12 text-xl"
        />
        <span className="pointer-events-none absolute flex ps-3">
          <Iconify
            icon="ph:magnifying-glass"
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="group-focus-within:text-brand h-6 w-6 text-muted-foreground"
          />
        </span>
      </fieldset>
    </Form>
  )
}
