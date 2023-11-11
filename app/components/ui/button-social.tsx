import { useFetcher } from "@remix-run/react"
import { match } from "ts-pattern"

import { ButtonLoading } from "~/components/ui/button-loading"
import { Iconify } from "~/components/ui/iconify"
import { type AuthStrategy } from "~/services/auth.server"

interface SocialButtonProps {
  provider: AuthStrategy
  label: string
}

const getIconName = (providerName: string) =>
  match(providerName)
    .with("github", () => "fe:github")
    .with("google", () => "fe:google")
    .otherwise(() => "fe:donut")

export function ButtonSocial({ provider, label }: SocialButtonProps) {
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
