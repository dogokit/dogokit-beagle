import { redirect, type LoaderFunctionArgs } from "@remix-run/node"

import { authService, type AuthStrategy } from "~/services/auth.server"

/**
 * No need to modify this
 * Only modify app/services/auth_strategies/<provider>.strategy.ts
 */

export const loader = ({ request, params }: LoaderFunctionArgs) => {
  if (!params.provider) return redirect("/login")

  const provider = params.provider as AuthStrategy

  return authService.authenticate(provider, request, {
    successRedirect: "/user/dashboard",
    failureRedirect: "/login",
  })
}
