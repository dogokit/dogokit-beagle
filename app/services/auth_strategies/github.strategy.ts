// Refer to https://github.com/sergiodxa/remix-auth-github for more information
import { GitHubStrategy } from "remix-auth-github"

import { type User } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"
import { parsedEnv } from "~/utils/env.server"

const clientID = parsedEnv.GITHUB_CLIENT_ID
const clientSecret = parsedEnv.GITHUB_CLIENT_SECRET

if (!clientID || !clientSecret) {
	throw new Error("Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET")
}

export const githubStrategy = new GitHubStrategy<User>(
	{
		clientID,
		clientSecret,
		callbackURL: `${parsedEnv.APP_URL}/auth/${AuthStrategies.GITHUB}/callback`,
	},
	async ({ accessToken, extraParams, profile }) => {
		// Do something with the tokens and profile
		return {
			id: "",
		}
	},
)
