/**
 * The session theme
 *
 * To be used together with app/components/shared/theme.tsx
 *
 * From https://github.com/remix-run/examples/tree/main/dark-mode
 */

import { createCookieSessionStorage } from "@remix-run/node"

import { isTheme, type Theme } from "~/components/shared/theme"
import { convertDaysToSeconds } from "~/utils/datetime"
import { isProduction, parsedEnv } from "~/utils/env.server"

/**
 * The main theme components and functions
 */

const themeStorage = createCookieSessionStorage({
  cookie: {
    name: "__theme_session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: [parsedEnv.SESSION_SECRET || "DEFAULT_SECRET"],
    secure: isProduction,
    maxAge: convertDaysToSeconds(400),
  },
})

async function getThemeSession(request: Request) {
  const session = await themeStorage.getSession(request.headers.get("Cookie"))
  return {
    getTheme: () => {
      const themeValue: Theme = session.get("theme")
      return isTheme(themeValue) ? themeValue : null
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  }
}

export { getThemeSession }
