import { type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node"
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

import { SiteLayout } from "~/components/layout/site-layout"
import { configDocumentLinks } from "~/configs/document"
import { themeSessionResolver } from "~/services/theme.server"
import { cn } from "~/utils/cn"

export const links: LinksFunction = () => configDocumentLinks

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getTheme } = await themeSessionResolver(request)

  return {
    theme: getTheme(),
  }
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
        {isDashboard ? (
          <Outlet />
        ) : (
          <SiteLayout>
            <Outlet />
          </SiteLayout>
        )}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
