import { modelUser } from "~/models/user.server"
import { authenticator } from "~/services/auth.server"
import { invariant } from "~/utils/invariant"

/**
 * Complete check with getting user from the database
 */
export async function requireUser(request: Request) {
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })

  const user = await modelUser.getById({ id: userSession.id })
  invariant(user, "User not found")

  return {
    user,
    userId: user.id,
  }
}

/**
 * Quick check without getting user from the database
 */
export async function requireUserId(request: Request) {
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })
  invariant(userSession, "User session not found")
  return {
    userId: userSession.id,
  }
}
