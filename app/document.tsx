import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react"
import { PreventFlashOnWrongTheme, useTheme, type Theme } from "remix-themes"

import { AppLayout } from "~/components/layout/app-layout"
import { SiteLayout } from "~/components/layout/site-layout"
import { NProgress } from "~/components/shared/nprogress"
import { cn } from "~/utils/cn"

export function Document({
  dataTheme,
  children,
}: {
  dataTheme?: Theme | null
  children?: React.ReactNode
}) {
  const [theme] = useTheme()
  const defaultTheme = theme ? theme : "light"

  const location = useLocation()
  const isInsideApp =
    location.pathname === "/new" ||
    location.pathname.startsWith("/user/") ||
    location.pathname.startsWith("/admin/") ||
    location.pathname.startsWith("/owner/")

  return (
    <html lang="en" data-theme={defaultTheme}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(dataTheme)} />
        <Links />
      </head>

      <body id="__remix" className={cn(defaultTheme)}>
        <NProgress />

        {children && !isInsideApp && <SiteLayout>{children}</SiteLayout>}
        {children && isInsideApp && <AppLayout>{children}</AppLayout>}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
