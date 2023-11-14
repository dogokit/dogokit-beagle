import { useFetcher } from "@remix-run/react"

import { ButtonLoading } from "~/components/ui/button-loading"
import { Iconify } from "~/components/ui/iconify"

export function CreateForm() {
  const fetcher = useFetcher()

  return (
    <div className="flex gap-2">
      <fetcher.Form
        action="/user/posts/new"
        className="flex items-center gap-2"
      >
        <ButtonLoading
          size="xs"
          loadingText="Creating..."
          isLoading={fetcher.state === "submitting"}
        >
          <Iconify icon="ph:plus-square-duotone" />
          <span>Create Post</span>
        </ButtonLoading>
      </fetcher.Form>
    </div>
  )
}
