// Refer to https://github.com/pbteja1998/remix-auth-google for more information
import { AuthorizationError } from "remix-auth"
import { GoogleStrategy } from "remix-auth-google"
import { modelUser } from "~/models/user.server"

import { type UserSession } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"
import { parsedEnv } from "~/utils/env.server"
import { createNanoIdShort, getUsernameFromEmail } from "~/utils/string"

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

    const user = await modelUser.getByEmail({ email })

    // If user already exist by email
    if (user) {
      if (user.images.length < 1) {
        await modelUser.continueAttachImage({ id: user.id, imageUrl })
        return { id: user.id }
      }
      return { id: user.id }
    }

    // If new user
    const existingUsername = await modelUser.getByUsername({ username })

    const newUser = await modelUser.continueWithService({
      email,
      fullname,
      imageUrl,
      username: existingUsername
        ? `${username}_${createNanoIdShort()}`
        : username,
    })
    if (!newUser) {
      throw new AuthorizationError("Failed to create account with Google")
    }

    return { id: newUser.id }
  },
)
