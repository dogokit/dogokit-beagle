import { Authenticator } from "remix-auth"

import { AuthStrategies } from "~/services/auth_strategies"
import { sessionStorage } from "~/services/session.server"

import { formStrategy } from "~/services/auth_strategies/form.strategy"
import { githubStrategy } from "~/services/auth_strategies/github.strategy"
import { googleStrategy } from "~/services/auth_strategies/google.strategy"
import { oauth2Strategy } from "~/services/auth_strategies/oauth2.strategy"
import { twitterStrategy } from "~/services/auth_strategies/twitter.strategy"

export interface User {
	// Add your own user properties here or extend with a type from your database
}

export type AuthStrategy = (typeof AuthStrategies)[keyof typeof AuthStrategies]

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export const authenticator = new Authenticator<User>(sessionStorage)

// Register your strategies below
authenticator.use(formStrategy, AuthStrategies.FORM)
authenticator.use(oauth2Strategy, AuthStrategies.OAUTH2)
authenticator.use(githubStrategy, AuthStrategies.GITHUB)
authenticator.use(googleStrategy, AuthStrategies.GOOGLE)
authenticator.use(twitterStrategy, AuthStrategies.TWITTER)
