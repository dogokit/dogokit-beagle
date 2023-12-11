import { useFetcher } from "@remix-run/react"
import { match } from "ts-pattern"

import { ButtonLoading } from "~/components/ui/button-loading"
import { Iconify } from "~/components/ui/iconify"
import { type AuthStrategy } from "~/services/auth.server"

const getIconName = (providerName: string) =>
  match(providerName)
    .with("github", () => "simple-icons:github")
    .with("google", () => "simple-icons:google")
    .otherwise(() => "simple-line-icons:question")

export function FormButtonOAuth({
  provider,
  label,
}: {
  provider: AuthStrategy
  label: string
}) {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"
  const isMatch = provider === fetcher.formData?.get("formId")

  return (
    <fetcher.Form method="POST" action={`/auth/${provider}`} className="flex">
      <input type="hidden" name="formId" defaultValue={provider} />
      <ButtonLoading
        size="sm"
        isIconText
        className="flex-[auto]"
        iconComponent={<Iconify icon={getIconName(provider)} />}
        loadingText={`Continuing with ${label}...`}
        isLoading={isMatch && isSubmitting}
      >
        Continue with {label}
      </ButtonLoading>
    </fetcher.Form>
  )
}
