import { createCookieSessionStorage } from "@remix-run/node"

import { isProduction, parsedEnv } from "~/utils/env.server"

export const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "__auth_session",
		httpOnly: true,
		path: "/",
		sameSite: "lax",
		secrets: [parsedEnv.SESSION_SECRET],
		secure: isProduction,
		domain: isProduction ? parsedEnv.APP_URL : undefined,
	},
})

export const { getSession, commitSession, destroySession } = sessionStorage
