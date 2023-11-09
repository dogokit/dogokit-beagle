import { Form } from "@remix-run/react"
import { match } from "ts-pattern"

import { Button } from "~/components/ui/button"
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
  return (
    <Form action={`/auth/${provider}`} method="POST" className="flex">
      <Button size="sm" isIconText className="flex-[auto]">
        <Iconify icon={getIconName(provider)} />
        <span>{label}</span>
      </Button>
    </Form>
  )
}
