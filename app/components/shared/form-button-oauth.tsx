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
        icon={<IconMatch icon={provider} />}
        loadingText={`Continuing with ${label}...`}
        isLoading={isMatch && isSubmitting}
      >
        Continue with {label}
      </ButtonLoading>
    </fetcher.Form>
  )
}
