import { createThemeAction } from "remix-themes"

import { themeSessionResolver } from "~/services/theme-session.server"

export const action = createThemeAction(themeSessionResolver)
