import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react"
import { PreventFlashOnWrongTheme, type Theme } from "remix-themes"

import { AppLayout } from "~/components/layout/app-layout"
import { SiteLayout } from "~/components/layout/site-layout"
import { NProgress } from "~/components/shared/nprogress"
import { cn } from "~/utils/cn"

export function Document({
  children,
  theme,
}: {
  children: React.ReactNode
  theme?: Theme | null
}) {
  const location = useLocation()
  const isInsideApp =
    location.pathname.startsWith("/user/") ||
    location.pathname.startsWith("/admin/") ||
    location.pathname.startsWith("/root/")

  return (
    <html lang="en" data-theme={theme ?? ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)} />
        <Links />
      </head>

      <body id="__remix" className={cn(theme)}>
        <NProgress />

        {!isInsideApp && <SiteLayout>{children}</SiteLayout>}
        {isInsideApp && <AppLayout>{children}</AppLayout>}

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
