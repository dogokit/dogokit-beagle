/**
 * By default, Remix will handle generating the HTTP Response.
 * Feel free to delete this file if like to,
 * but if want it revealed again, run `pnpx remix reveal`
 * For more information, see https://remix.run/file-conventions/entry.server
 */

import { PassThrough } from "node:stream"

import {
  createReadableStreamFromReadable,
  type ActionFunctionArgs,
  type AppLoadContext,
  type EntryContext,
  type LoaderFunctionArgs,
} from "@remix-run/node"
import { RemixServer } from "@remix-run/react"
import * as Sentry from "@sentry/remix"
import { isbot } from "isbot"
import { renderToPipeableStream } from "react-dom/server"

import { isProduction, parsedEnv } from "~/utils/env.server"

const ABORT_DELAY = 5_000

export function handleError(error: unknown, { request }: { request: Request }) {
  if (isProduction) {
    Sentry.captureRemixServerException(error, "remix.server", request)
  }
}

isProduction &&
  Sentry.init({
    dsn: parsedEnv.SENTRY_DSN,
    tracesSampleRate: 1,
  })

/**
 * Fix double data request when prefetching in Remix
 *
 * https://remix.run/docs/en/main/file-conventions/entry.server#handledatarequest
 * https://sergiodxa.com/articles/fix-double-data-request-when-prefetching-in-remix
 */
export function handleDataRequest(
  response: Response,
  { request }: LoaderFunctionArgs | ActionFunctionArgs,
) {
  const isGet = request.method.toLowerCase() === "get"
  const purpose =
    request.headers.get("Purpose") ||
    request.headers.get("X-Purpose") ||
    request.headers.get("Sec-Purpose") ||
    request.headers.get("Sec-Fetch-Purpose") ||
    request.headers.get("Moz-Purpose")
  const isPrefetch = purpose === "prefetch"

  // If it's a GET request + a prefetch request + doesn't have a Cache-Control header
  if (isGet && isPrefetch && !response.headers.has("Cache-Control")) {
    // Cache for 5 seconds only on the browser
    response.headers.set("Cache-Control", "private, max-age=5")
  }

  return response
}

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
  _loadContext: AppLoadContext,
) {
  return isbot(String(request.headers.get("user-agent")))
    ? handleBotRequest(request, responseStatusCode, responseHeaders, remixContext)
    : handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext)
}

function handleBotRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
      {
        onAllReady() {
          shellRendered = true
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set("Content-Type", "text/html")

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          responseStatusCode = 500
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error)
          }
        },
      },
    )

    setTimeout(abort, ABORT_DELAY)
  })
}

function handleBrowserRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext,
) {
  return new Promise((resolve, reject) => {
    let shellRendered = false
    const { pipe, abort } = renderToPipeableStream(
      <RemixServer context={remixContext} url={request.url} abortDelay={ABORT_DELAY} />,
      {
        onShellReady() {
          shellRendered = true
          const body = new PassThrough()
          const stream = createReadableStreamFromReadable(body)

          responseHeaders.set("Content-Type", "text/html")

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            }),
          )

          pipe(body)
        },
        onShellError(error: unknown) {
          reject(error)
        },
        onError(error: unknown) {
          responseStatusCode = 500
          // Log streaming rendering errors from inside the shell.  Don't log
          // errors encountered during initial shell rendering since they'll
          // reject and get logged in handleDocumentRequest.
          if (shellRendered) {
            console.error(error)
          }
        },
      },
    )

    setTimeout(abort, ABORT_DELAY)
  })
}
