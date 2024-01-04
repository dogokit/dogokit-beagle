import { type Prisma } from "@prisma/client"
import { Authenticator } from "remix-auth"

import { type modelUser } from "~/models/user.server"
import { authSessionStorage } from "~/services/auth-session.server"
import { AuthStrategies } from "~/services/auth_strategies"
import { formStrategy } from "~/services/auth_strategies/form.strategy"
import { githubStrategy } from "~/services/auth_strategies/github.strategy"
import { googleStrategy } from "~/services/auth_strategies/google.strategy"

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
export const authService = new Authenticator<UserSession>(authSessionStorage)

// Register the strategies
authService.use(formStrategy, AuthStrategies.FORM)
authService.use(githubStrategy, AuthStrategies.GITHUB)
authService.use(googleStrategy, AuthStrategies.GOOGLE)
