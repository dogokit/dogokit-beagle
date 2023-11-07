// Refer to https://github.com/sergiodxa/remix-auth-github for more information
import { AuthorizationError } from "remix-auth"
import { GitHubStrategy } from "remix-auth-github"
import { prisma } from "~/libs/db.server"

import { type UserSession } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"
import { parsedEnv } from "~/utils/env.server"

const clientID = parsedEnv.GITHUB_CLIENT_ID
const clientSecret = parsedEnv.GITHUB_CLIENT_SECRET

if (!clientID || !clientSecret) {
  throw new Error("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET")
}

export const githubStrategy = new GitHubStrategy<UserSession>(
  {
    clientID,
    clientSecret,
    callbackURL: `${parsedEnv.APP_URL}/auth/${AuthStrategies.GITHUB}/callback`,
  },
  async ({ profile }) => {
    const email = profile.emails[0]?.value.trim().toLowerCase()
    if (!email) throw new AuthorizationError("Email is not found")

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    })
    if (existingUser) {
      return { id: existingUser.id }
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        fullname: profile._json.name,
        username: profile._json.login,
        images: { create: { url: profile.photos[0].value } },
      },
      select: { id: true },
    })
    if (!newUser) throw new AuthorizationError("Failed to create account")

    return { id: newUser.id }
  },
)
