import { Form } from "@remix-run/react"
import { Button } from "~/components/ui/button"

import { type AuthStrategy } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"

interface SocialButtonProps {
  provider: AuthStrategy
  label: string
}

const SocialButton = ({ provider, label }: SocialButtonProps) => (
  <Form action={`/auth/${provider}`} method="post">
    <Button>{label}</Button>
  </Form>
)

export default function LoginRoute() {
  return (
    <>
      <SocialButton provider={AuthStrategies.FORM} label="Login with form" />
      <SocialButton
        provider={AuthStrategies.GITHUB}
        label="Login with github"
      />
      <SocialButton
        provider={AuthStrategies.GOOGLE}
        label="Login with google"
      />
      <SocialButton
        provider={AuthStrategies.TWITTER}
        label="Login with twitter"
      />
    </>
  )
}
