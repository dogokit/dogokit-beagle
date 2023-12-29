import { type LoaderFunctionArgs } from "@remix-run/node"
import { Outlet, type Params } from "@remix-run/react"

import {
  ErrorHelpInformation,
  GeneralErrorBoundary,
} from "~/components/shared/error-boundary"
import { configRedirects } from "~/configs/redirects"
import { redirectRouteToUrl } from "~/utils/redirect-route.server"

export const loader = ({ request }: LoaderFunctionArgs) => {
  return redirectRouteToUrl(request, configRedirects)
}

export default function UsernameLayoutRoute() {
  return <Outlet />
}

export function ErrorBoundary() {
  return (
    <GeneralErrorBoundary
      statusHandlers={{
        404: ({ params }) => <UsernameErrorMessage params={params} />,
      }}
    />
  )
}

function UsernameErrorMessage({ params }: { params: Params }) {
  return (
    <>
      <section className="site-section prose-config">
        <h1>Sorry, this page or user could not be found</h1>
        <p>Cannot find page or user with the username "{params.username}"</p>
        <p>
          The requested page or user either doesn’t exist or you don’t have
          access to it.
        </p>
      </section>
      <ErrorHelpInformation />
    </>
  )
}
