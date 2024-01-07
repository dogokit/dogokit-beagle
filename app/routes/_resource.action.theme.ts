import { json, redirect, type ActionFunctionArgs } from "@remix-run/node"

import { isTheme } from "~/components/shared/theme"
import { getThemeSession } from "~/services/theme.server"

export const loader = () => redirect("/", { status: 404 })

export const action = async ({ request }: ActionFunctionArgs) => {
  const themeSession = await getThemeSession(request)
  const requestText = await request.text()
  const form = new URLSearchParams(requestText)
  const theme = form.get("theme")

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `Theme value of ${theme} is not a valid theme`,
    })
  }

  themeSession.setTheme(theme)
  return json({ success: true }, { headers: { "Set-Cookie": await themeSession.commit() } })
}
