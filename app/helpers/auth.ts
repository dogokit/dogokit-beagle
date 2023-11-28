import { modelUser } from "~/models/user.server"
import { authenticator } from "~/services/auth.server"
import { invariant } from "~/utils/invariant"

/**
 * Complete check with getting user from the database
 *
 * Quick check without getting user from the database might be unnecessary
 * because need to always check the user availability
 */
export async function requireUser(request: Request) {
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })

  const user = await modelUser.getForSession({ id: userSession.id })
  invariant(user, "User not found")

  return {
    user,
    userId: user.id,
  }
}
