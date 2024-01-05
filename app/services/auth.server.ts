import { type Prisma } from "@prisma/client"
import { createCookieSessionStorage } from "@remix-run/node"
import { Authenticator } from "remix-auth"

import { type modelUser } from "~/models/user.server"
import { AuthStrategies } from "~/services/auth-strategies"
import { formStrategy } from "~/services/auth-strategies/form.strategy"
import { githubStrategy } from "~/services/auth-strategies/github.strategy"
import { googleStrategy } from "~/services/auth-strategies/google.strategy"
import { convertDaysToSeconds } from "~/utils/datetime"
import { isProduction, parsedEnv } from "~/utils/env.server"

export const authStorage = createCookieSessionStorage({
  cookie: {
    name: "__auth_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [parsedEnv.SESSION_SECRET],
    secure: isProduction,
    maxAge: convertDaysToSeconds(30), // EDITME: Change session persistence
  },
})

// Stored in the cookie
export interface UserSession {
  id: string
  // Add user properties here or extend with a type from the database
}

// Not stored in the cookie, only retrieved when necessary
export interface UserData
  extends NonNullable<
    Prisma.PromiseReturnType<typeof modelUser.getForSession>
  > {}

export type AuthStrategy = (typeof AuthStrategies)[keyof typeof AuthStrategies]

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authService = new Authenticator<UserSession>(authStorage)

// Register the strategies
authService.use(formStrategy, AuthStrategies.FORM)
authService.use(githubStrategy, AuthStrategies.GITHUB)
authService.use(googleStrategy, AuthStrategies.GOOGLE)
