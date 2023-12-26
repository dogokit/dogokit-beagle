import { createCookieSessionStorage } from "@remix-run/node"
import { createThemeSessionResolver } from "remix-themes"

import { convertDaysToSeconds } from "~/utils/datetime"
import { isProduction, parsedEnv } from "~/utils/env.server"

const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__theme_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [parsedEnv.SESSION_SECRET],
    secure: isProduction,
    maxAge: convertDaysToSeconds(400),
  },
})

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage)
