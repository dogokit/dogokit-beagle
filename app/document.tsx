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
import { PreventFlashOnWrongTheme, useTheme } from "remix-themes"

import { AppLayout } from "~/components/layout/app-layout"
import { SiteLayout } from "~/components/layout/site-layout"
import { type loader as rootLoader } from "~/root"
import { cn } from "~/utils/cn"
import { NProgress } from "./components/shared/nprogress"

export function Document() {
  const data = useLoaderData<typeof rootLoader>()
  const [theme] = useTheme()

  const defaultTheme = theme ? theme : "light"

  const location = useLocation()
  const isInsideApp =
    location.pathname.startsWith("/user") ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/root")

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
        <NProgress />

        {!isInsideApp && (
          <SiteLayout>
            <Outlet />
          </SiteLayout>
        )}
        {isInsideApp && (
          <AppLayout>
            {" "}
            <Outlet />
          </AppLayout>
        )}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
