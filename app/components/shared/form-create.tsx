import { useFetcher } from "@remix-run/react"

import { ButtonLoading } from "~/components/ui/button-loading"
import { Iconify } from "~/components/ui/iconify"

export function FormCreate({
  action = "/user/posts/new",
}: {
  action?: string
}) {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  return (
    <div className="flex gap-2">
      <fetcher.Form
        method="POST"
        action={action}
        className="flex items-center gap-2"
      >
        <ButtonLoading
          size="xs"
          loadingText="Creating..."
          isLoading={isSubmitting}
        >
          <Iconify icon="ph:plus-square-duotone" />
          <span>Create Post</span>
        </ButtonLoading>
      </fetcher.Form>
    </div>
  )
}
