// Refer to https://github.com/pbteja1998/remix-auth-google for more information
import { AuthorizationError } from "remix-auth"
import { GoogleStrategy } from "remix-auth-google"
import { modelUser } from "~/models/user.server"

import { type UserSession } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"
import { parsedEnv } from "~/utils/env.server"
import { getUsernameFromEmail } from "~/utils/string"

const clientID = parsedEnv.GOOGLE_CLIENT_ID || ""
const clientSecret = parsedEnv.GOOGLE_CLIENT_SECRET || ""
const callbackURL = `${parsedEnv.APP_URL}/auth/${AuthStrategies.GOOGLE}/callback`

// Enable this to force these to be required
// if (!clientID || !clientSecret) {
//   throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET")
// }

export const googleStrategy = new GoogleStrategy<UserSession>(
  { clientID, clientSecret, callbackURL },
  async ({ profile }) => {
    const email = profile.emails[0]?.value.trim().toLowerCase()
    if (!email) throw new AuthorizationError("Email is not found")

    const fullname = profile._json.name
    const imageUrl = profile.photos[0].value
    const username = getUsernameFromEmail(profile._json.email)
    const providerName = "google"
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
      throw new AuthorizationError("Failed to continue with Google")
    }

    return { id: user.id }
  },
)
