import {
  Links,
  LiveReload,
  Meta,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import { PreventFlashOnWrongTheme, useTheme, type Theme } from "remix-themes"

import { NProgress } from "~/components/shared/nprogress"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { cn } from "~/utils/cn"

export function Document({
  dataTheme,
  children,
}: {
  dataTheme?: Theme | null
  children?: React.ReactNode
}) {
  const { ENV } = useRootLoaderData()
  const [theme] = useTheme()
  const defaultTheme = theme ? theme : "light"

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

        {children}

        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
