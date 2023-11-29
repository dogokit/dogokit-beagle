import {
  isRouteErrorResponse,
  useLocation,
  useParams,
  useRouteError,
  type ErrorResponse,
} from "@remix-run/react"
import { Anchor } from "~/components/ui/anchor"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
// import { captureRemixErrorBoundaryError } from '@sentry/remix'

type StatusHandler = (info: {
  error: ErrorResponse
  params: Record<string, string | undefined>
}) => JSX.Element | null

export function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => <GeneralErrorMessage error={error} />,
  statusHandlers,
  unexpectedErrorHandler = error => (
    <GeneralErrorMessage error={error as ErrorResponse} />
  ),
}: {
  defaultStatusHandler?: StatusHandler
  statusHandlers?: Record<number, StatusHandler>
  unexpectedErrorHandler?: (error: unknown) => JSX.Element | null
}) {
  const params = useParams()
  const error = useRouteError()

  // IDEA: captureRemixErrorBoundaryError(error)

  if (typeof document !== "undefined") {
    console.error(error)
  }

  return (
    <div className="site-container pb-20">
      {isRouteErrorResponse(error)
        ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
            error,
            params,
          })
        : unexpectedErrorHandler(error)}
    </div>
  )
}

export function getErrorMessage(error: unknown) {
  if (typeof error === "string") return error
  if (
    error &&
    typeof error === "object" &&
    "message" in error &&
    typeof error.message === "string"
  ) {
    return error.message
  }
  console.error("Unable to get error message for error", error)
  return "Unknown Error"
}

function GeneralErrorMessage({ error }: { error: ErrorResponse }) {
  const location = useLocation()

  return (
    <>
      <section className="prose-config site-section">
        <h1>Sorry, something went wrong</h1>
        <p>
          The requested page either doesn’t exist or you don’t have access to
          it.
        </p>
        <ul>
          <li>
            Something wrong on <code>{location.pathname}</code>
          </li>
          {error.status && (
            <li>
              {error.status} {error.data}
            </li>
          )}
        </ul>
      </section>

      <ErrorHelpInformation />
    </>
  )
}

export function ErrorHelpInformation({
  extraButtonLinks,
}: {
  extraButtonLinks?: React.ReactNode
}) {
  return (
    <>
      <section className="site-section mb-20">
        <div className="flex items-center gap-2">
          <ButtonLink size="sm" variant="secondary" to="/">
            <Iconify icon="ph:house-duotone" />
            <span>Go to Home</span>
          </ButtonLink>
          <ButtonLink size="sm" variant="secondary" to="/help">
            <Iconify icon="ph:question-duotone" />
            <span>Go to Help</span>
          </ButtonLink>
          {extraButtonLinks}
        </div>
      </section>

      <section className="site-section prose-config">
        <h2>Did you follow a link from here?</h2>
        <p>
          If you reached this page from another part of Dogokit, please let us
          know so we can correct our mistake.
        </p>

        <h2>Did you follow a link from another site?</h2>
        <p>
          Links from other sites can sometimes be outdated or misspelled. Let us
          know where you came from and we can try to contact the other site in
          order to fix the problem.
        </p>

        <h2>Did you type the URL?</h2>
        <p>
          You may have typed the address (URL) incorrectly. Check to make sure
          you’ve got the exact right spelling, capitalization, etc.
        </p>

        <small>
          This error information is inspired by{" "}
          <Anchor href="https://basecamp.com">Basecamp</Anchor>
        </small>
      </section>
    </>
  )
}
