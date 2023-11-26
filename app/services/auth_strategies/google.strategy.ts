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

    const existingUser = await modelUser.getByEmail({ email })
    if (existingUser) {
      return { id: existingUser.id }
    }

    const newUser = await modelUser.continueWithService({
      email,
      fullname: profile._json.name,
      username: getUsernameFromEmail(profile._json.email),
      imageUrl: profile.photos[0].value,
    })
    if (!newUser) throw new AuthorizationError("Failed to create account")

    return { id: newUser.id }
  },
)
