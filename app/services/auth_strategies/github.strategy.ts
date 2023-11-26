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

    const user = await modelUser.getByEmail({ email })

    if (user) {
      if (user.images.length < 1) {
        await modelUser.continueAttachImage({
          id: user.id,
          imageUrl: profile.photos[0].value,
        })
        return { id: user.id }
      }
      return { id: user.id }
    }

    try {
      const newUser = await modelUser.continueWithService({
        email,
        fullname: profile._json.name,
        username: profile._json.login,
        imageUrl: profile.photos[0].value,
      })
      if (!newUser) throw new AuthorizationError("Failed to create account")
      return { id: newUser.id }
    } catch (error) {
      throw new AuthorizationError("Failed to create account")
    }
  },
)
