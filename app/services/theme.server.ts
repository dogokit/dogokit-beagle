import { createCookieSessionStorage } from "@remix-run/node"
import { createThemeSessionResolver } from "remix-themes"

import { convertDaysToSeconds } from "~/utils/datetime"
import { isProduction, parsedEnv } from "~/utils/env.server"

const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__theme_session",
    httpOnly: true,
    maxAge: convertDaysToSeconds(400),
    path: "/",
    sameSite: "lax",
    secrets: [parsedEnv.SESSION_SECRET],
    secure: isProduction,
  },
})

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage)
