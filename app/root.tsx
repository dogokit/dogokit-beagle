import {
  json,
  redirect,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react"
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes"

import { DashboardLayout } from "~/components/layout/dashboard-layout"
import { SiteLayout } from "~/components/layout/site-layout"
import { configDocumentLinks } from "~/configs/document"
import { modelUser } from "~/models/user.server"
import { authenticator } from "~/services/auth.server"
import { themeSessionResolver } from "~/services/theme.server"
import { cn } from "~/utils/cn"
import { parsedEnv } from "~/utils/env.server"

export const links: LinksFunction = () => configDocumentLinks

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

export default function Route() {
  const data = useLoaderData<typeof loader>()

  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <App />
    </ThemeProvider>
  )
}

export function App() {
  const data = useLoaderData<typeof loader>()
  const [theme] = useTheme()
  const defaultTheme = theme ? theme : "dark"

  const location = useLocation()
  const isDashboard = location.pathname.startsWith("/dashboard")

  return (
    <html lang="en" data-theme={defaultTheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
        <Links />
      </head>

      <body id="__remix" className={cn(defaultTheme)}>
        {!isDashboard && (
          <SiteLayout>
            <Outlet />
          </SiteLayout>
        )}
        {isDashboard && (
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        )}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
