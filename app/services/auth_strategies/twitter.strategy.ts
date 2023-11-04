// Refer to https://github.com/na2hiro/remix-auth-twitter for more information
import { Twitter2Strategy } from "remix-auth-twitter"
import { type User } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"

const clientID = process.env.TWITTER_CLIENT_ID
const clientSecret = process.env.TWITTER_CLIENT_SECRET

if (!clientID || !clientSecret) {
	throw new Error("Missing TWITTER_CLIENT_ID or TWITTER_CLIENT_SECRET")
}

export const twitterStrategy = new Twitter2Strategy<User>(
	{
		clientID,
		clientSecret,
		callbackURL: `${process.env.APP_URL}/auth/${AuthStrategies.TWITTER}/callback`,
		scopes: ["users.read", "tweet.read", "tweet.write"],
	},
	async ({ accessToken }) => {
		// Do something with the tokens and profile
		return {}
	},
)
