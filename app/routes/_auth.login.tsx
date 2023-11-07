import { type ActionFunctionArgs } from "@remix-run/node"
import { Form } from "@remix-run/react"

import { Button } from "~/components/ui/button"
import { authenticator, type AuthStrategy } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"

export const loader = async ({ request }: ActionFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  })
  return null
}

export default function ContinueRoute() {
  return (
    <>
      <SocialButton
        provider={AuthStrategies.FORM}
        label="Continue with Email/Password"
      />
      <SocialButton
        provider={AuthStrategies.GITHUB}
        label="Continue with GitHub"
      />
      <SocialButton
        provider={AuthStrategies.GOOGLE}
        label="Continue with Google"
      />
      <SocialButton
        provider={AuthStrategies.TWITTER}
        label="Continue with Twitter"
      />
    </>
  )
}

interface SocialButtonProps {
  provider: AuthStrategy
  label: string
}

const SocialButton = ({ provider, label }: SocialButtonProps) => (
  <Form action={`/auth/${provider}`} method="post">
    <Button>{label}</Button>
  </Form>
)
