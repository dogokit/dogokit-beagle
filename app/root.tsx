import {
  json,
  redirect,
  type HeadersFunction,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { ThemeProvider, useTheme, type Theme } from "remix-themes"

import { GeneralErrorBoundary } from "~/components/shared/error-boundary"
import { configDocumentLinks } from "~/configs/document"
import { Document } from "~/document"
import { modelUser } from "~/models/user.server"
import { authenticator } from "~/services/auth.server"
import { themeSessionResolver } from "~/services/theme.server"
import { parsedEnv } from "~/utils/env.server"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const links: LinksFunction = () => configDocumentLinks

export const headers: HeadersFunction = () => {
  return {
    "Accept-CH": "Sec-CH-Prefers-Color-Scheme",
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getTheme } = await themeSessionResolver(request)

  const userSession = await authenticator.isAuthenticated(request)
  const userData = await modelUser.getForSession({
    id: String(userSession?.id),
  })
  if (userSession && !userData) return redirect(`/logout`)

  return json({
    theme: getTheme(),
    userSession,
    userData,
    NODE_ENV: parsedEnv.NODE_ENV,
    ENV: {
      UPLOADCARE_PUBLIC_KEY: parsedEnv.UPLOADCARE_PUBLIC_KEY,
    },
  })
}

export default function RootRoute() {
  const data = useLoaderData<typeof loader>()
  const speficiedTheme = data.theme

  return (
    <ThemeProvider
      specifiedTheme={speficiedTheme}
      themeAction="/action/set-theme"
    >
      <App />
    </ThemeProvider>
  )
}

export function App() {
  const [theme] = useTheme()

  return (
    <Document theme={theme}>
      <Outlet />
    </Document>
  )
}

export function ErrorBoundary() {
  const speficiedTheme = "light" as Theme

  return (
    <ThemeProvider
      specifiedTheme={speficiedTheme}
      themeAction="/action/set-theme"
    >
      <Document>
        <GeneralErrorBoundary />
      </Document>
    </ThemeProvider>
  )
}
