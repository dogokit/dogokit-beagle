import { useFetcher } from "@remix-run/react"

import { ButtonLoading } from "~/components/ui/button-loading"
import { Card } from "~/components/ui/card"
import { Iconify } from "~/components/ui/iconify"

export function FormNew({
  action,
  icon,
  buttonText,
}: {
  action: string
  icon: string
  buttonText: string
}) {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  return (
    <Card className="flex flex-col items-center gap-2 p-4">
      <div className="text-6xl text-primary">
        <Iconify icon={icon} />
      </div>

      <fetcher.Form
        method="POST"
        action={action}
        className="flex items-center gap-2"
      >
        <ButtonLoading loadingText="Adding..." isLoading={isSubmitting}>
          <span>{buttonText}</span>
        </ButtonLoading>
      </fetcher.Form>
    </Card>
  )
}
