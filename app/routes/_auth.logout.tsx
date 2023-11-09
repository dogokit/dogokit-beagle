import { type ActionFunctionArgs } from "@remix-run/node"

import { authenticator } from "~/services/auth.server"

export const loader = async ({ request }: ActionFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" })
  return authenticator.logout(request, { redirectTo: "/login" })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" })
  return authenticator.logout(request, { redirectTo: "/login" })
}
