import { createCookieSessionStorage } from "@remix-run/node"

import { convertDaysToSeconds } from "~/utils/datetime"
import { isProduction, parsedEnv } from "~/utils/env.server"

export const authSessionStorage = createCookieSessionStorage({
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
