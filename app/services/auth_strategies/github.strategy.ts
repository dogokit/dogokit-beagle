// Refer to https://github.com/sergiodxa/remix-auth-github for more information
import { AuthorizationError } from "remix-auth"
import { GitHubStrategy } from "remix-auth-github"
import { modelUser } from "~/models/user.server"

import { type UserSession } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"
import { parsedEnv } from "~/utils/env.server"

const clientID = parsedEnv.GITHUB_CLIENT_ID || ""
const clientSecret = parsedEnv.GITHUB_CLIENT_SECRET || ""
const callbackURL = `${parsedEnv.APP_URL}/auth/${AuthStrategies.GITHUB}/callback`

// Enable this to force these to be required
// if (!clientID || !clientSecret) {
//   throw new Error("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET")
// }

export const githubStrategy = new GitHubStrategy<UserSession>(
  { clientID, clientSecret, callbackURL },
  async ({ profile }) => {
    const email = profile.emails[0]?.value.trim().toLowerCase()
    if (!email) throw new AuthorizationError("Email is not found")

    const fullname = profile._json.name
    const username = profile._json.login.replace(/-/g, "_")
    const imageUrl = profile.photos[0].value
    const providerName = "github"
    const providerId = profile.id

    const user = await modelUser.continueWithService({
      email,
      fullname,
      imageUrl,
      username,
      providerName,
      providerId,
    })
    if (!user) {
      throw new AuthorizationError("Failed to continue with GitHub")
    }

    return { id: user.id }
  },
)
