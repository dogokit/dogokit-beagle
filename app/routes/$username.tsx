import { type SEOHandle } from "@nasa-gcn/remix-seo"
import { type LoaderFunctionArgs } from "@remix-run/node"
import { Outlet, type Params } from "@remix-run/react"
import {
  ErrorHelpInformation,
  GeneralErrorBoundary,
} from "~/components/shared/error-boundary"

import { configRedirects } from "~/configs/redirects"
import { modelUser } from "~/models/user.server"
import { formatDateLastMod } from "~/utils/datetime"
import { redirectRouteToURL } from "~/utils/redirect-route.server"

export const handle: SEOHandle = {
  getSitemapEntries: async () => {
    const users = await modelUser.getAllUsernames()
    return users.map(user => {
      return {
        route: `/${user.username}`,
        priority: 0.7,
        lastmod: formatDateLastMod(user.updatedAt),
      }
    })
  },
}

export const loader = ({ request }: LoaderFunctionArgs) => {
  return redirectRouteToURL(request, configRedirects)
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
      <section className="prose-config site-section">
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
