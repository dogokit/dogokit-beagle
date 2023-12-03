import { redirect, type ActionFunctionArgs } from "@remix-run/node"

import { authenticator, type AuthStrategy } from "~/services/auth.server"

/**
 * No need to modify this
 * Only modify app/services/auth_strategies/<provider>.strategy.ts
 */

export const loader = () => redirect("/login")

export const action = async ({ request, params }: ActionFunctionArgs) => {
  if (!params.provider) return redirect("/login")
  const provider = params.provider as AuthStrategy
  return await authenticator.authenticate(provider, request, {
    successRedirect: "/user/dashboard",
  })
}
