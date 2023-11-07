import { type LoaderFunctionArgs } from "@remix-run/node"
import { authenticator } from "~/services/auth.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/user/dashboard",
  })
}
