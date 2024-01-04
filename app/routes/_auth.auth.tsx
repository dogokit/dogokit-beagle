import { type LoaderFunctionArgs } from "@remix-run/node"

import { authService } from "~/services/auth.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authService.isAuthenticated(request, {
    successRedirect: "/user/dashboard",
  })
}
