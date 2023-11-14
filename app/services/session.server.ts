import { createCookieSessionStorage } from "@remix-run/node"

import { convertDaysToSeconds } from "~/utils/datetime"
import { isProduction, parsedEnv } from "~/utils/env.server"

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__auth_session",
    httpOnly: true,
    maxAge: convertDaysToSeconds(7), // EDITME: Change session persistence
    path: "/",
    sameSite: "lax",
    secrets: [parsedEnv.SESSION_SECRET],
    secure: isProduction,
  },
})

export const { getSession, commitSession, destroySession } = authSessionStorage
