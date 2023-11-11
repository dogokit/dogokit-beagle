import { modelUser } from "~/models/user.server"
import { authenticator } from "~/services/auth.server"
import { invariant } from "~/utils/invariant"

export async function requireUser(request: Request) {
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })

  const user = await modelUser.getById({ id: userSession.id })
  invariant(user, "User not found")

  return user
}
