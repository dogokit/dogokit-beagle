import { type ActionFunctionArgs } from "@remix-run/node"
import { type MetaFunction } from "@remix-run/react"

import { authService } from "~/services/auth.server"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () => createMeta({ title: `Log Out` })

export const loader = async ({ request }: ActionFunctionArgs) => {
  await authService.isAuthenticated(request, { failureRedirect: "/login" })
  return authService.logout(request, { redirectTo: "/login" })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  await authService.isAuthenticated(request, { failureRedirect: "/login" })
  return authService.logout(request, { redirectTo: "/login" })
}
