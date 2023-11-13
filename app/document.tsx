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
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { cn } from "~/utils/cn"

export function Document({
  dataTheme,
  children,
}: {
  dataTheme?: Theme | null
  children: React.ReactNode
}) {
  const data = useRootLoaderData()
  const [theme] = useTheme()
  const defaultTheme = theme ? theme : "light"

  const location = useLocation()
  const isInsideApp =
    location.pathname.startsWith("/user/") ||
    location.pathname.startsWith("/admin/") ||
    location.pathname.startsWith("/root/")

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

        {!isInsideApp && <SiteLayout>{children}</SiteLayout>}
        {isInsideApp && <AppLayout>{children}</AppLayout>}

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
