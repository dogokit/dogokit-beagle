/**
 * By default, Remix will handle hydrating the app on the client.
 * Feel free to delete this file if like to,
 * but if want it revealed again, run `pnpx remix reveal`
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser, useLocation, useMatches } from "@remix-run/react"
import * as Sentry from "@sentry/remix"
import { startTransition, StrictMode, useEffect } from "react"
import { hydrateRoot } from "react-dom/client"

import { isProduction } from "~/utils/env.client"

isProduction &&
  Sentry.init({
    dsn: window.ENV.SENTRY_DSN,
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,

    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.remixRouterInstrumentation(
          useEffect,
          useLocation,
          useMatches,
        ),
      }),
      new Sentry.Replay(),
    ],
  })

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <RemixBrowser />
    </StrictMode>,
  )
})
