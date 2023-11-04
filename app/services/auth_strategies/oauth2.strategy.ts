// Refer to https://github.com/sergiodxa/remix-auth-oauth2 for more information
import { OAuth2Strategy, type OAuth2Profile } from "remix-auth-oauth2"
import { type User } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"

const clientID = process.env.OAUTH2_CLIENT_ID
const clientSecret = process.env.OAUTH2_CLIENT_SECRET
const oAuth2ProviderURL = process.env.OAUTH2_PROVIDER_URL

if (!clientID || !clientSecret || !oAuth2ProviderURL) {
	throw new Error("Missing OAUTH2_CLIENT_ID or OAUTH2_CLIENT_SECRET")
}

export const oauth2Strategy = new OAuth2Strategy<User, OAuth2Profile>(
	{
		authorizationURL: `${oAuth2ProviderURL}/oauth2/authorize`,
		tokenURL: `${oAuth2ProviderURL}/oauth2/token`,
		clientID,
		clientSecret,
		callbackURL: `${process.env.APP_URL}/auth/${AuthStrategies.OAUTH2}/callback`,
		useBasicAuthenticationHeader: false,
	},
	async ({ accessToken, refreshToken, profile }) => {
		// Do something with the tokens and profile
		return {}
	},
)
