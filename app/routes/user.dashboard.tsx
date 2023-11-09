import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { modelUser } from "~/models/user.server"
import { authenticator } from "~/services/auth.server"
import { createSitemap } from "~/utils/sitemap"
import { stringifyCode } from "~/utils/string"

export const handle = createSitemap()

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userSession = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })
  const user = await modelUser.getById({ id: userSession.id })
  return json({ user })
}

export default function UserDashboardRoute() {
  const { userData } = useRootLoaderData()
  const { user } = useLoaderData<typeof loader>()

  if (!userData) return null
  return (
    <div>
      <header>
        <h2>Welcome, {userData.fullname}</h2>
      </header>

      <section>
        <pre>{stringifyCode(user)}</pre>
      </section>
    </div>
  )
}
