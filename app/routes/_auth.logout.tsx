import { type ActionFunctionArgs } from "@remix-run/node"

import { authenticator } from "~/services/auth.server"

export const loader = async ({ request }: ActionFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" })
  await authenticator.logout(request, { redirectTo: "/" })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" })
  await authenticator.logout(request, { redirectTo: "/" })
}
