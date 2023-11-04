import { createCookieSessionStorage } from "@remix-run/node"
import { createThemeSessionResolver } from "remix-themes"

import { isProduction, parsedEnv } from "~/utils/env.server"

export const themeSessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__theme",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [parsedEnv.SESSION_SECRET],
    secure: isProduction,
    domain: isProduction ? parsedEnv.APP_URL : undefined,
  },
})

export const themeSessionResolver =
  createThemeSessionResolver(themeSessionStorage)
