import { useFetcher } from "@remix-run/react"

import { IconMatch } from "~/components/libs/icon"
import { ButtonLoading } from "~/components/ui/button-loading"
import { type AuthStrategy } from "~/services/auth.server"

export function FormButtonOAuth({ provider, label }: { provider: AuthStrategy; label: string }) {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"
  const isMatch = provider === fetcher.formData?.get("formId")

  return (
    <fetcher.Form method="POST" action={`/auth/${provider}`} className="flex">
      <input type="hidden" name="formId" defaultValue={provider} />
      <ButtonLoading
        isIconText
        className="flex-[auto]"
        isLoading={isMatch && isSubmitting}
        loadingText={`Continuing with ${label}...`}
        icon={<IconMatch icon={provider} className="size-4" />}
      >
        Continue with {label}
      </ButtonLoading>
    </fetcher.Form>
  )
}
