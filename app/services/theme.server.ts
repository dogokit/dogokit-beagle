import { createCookieSessionStorage } from "@remix-run/node"
import { createThemeSessionResolver } from "remix-themes"

import { convertDaysToSeconds } from "~/utils/datetime"
import { isProduction, parsedEnv } from "~/utils/env.server"

const remember = true // LATER: Integrate on auth form flow

export const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__theme_session",
    httpOnly: true,
    maxAge: remember
      ? convertDaysToSeconds(7) // EDITME: Change session persistence
      : undefined,
    path: "/",
    sameSite: "lax",
    secrets: [parsedEnv.SESSION_SECRET],
    secure: isProduction,
  },
})

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage)
