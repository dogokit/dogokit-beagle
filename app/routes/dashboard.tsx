import { type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { authenticator } from "~/services/auth.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  })
  return { message: "Dashboard" }
}

export default function DashboardRoute() {
  const { userData } = useRootLoaderData()
  const { message } = useLoaderData<typeof loader>()

  if (!userData) return null

  return (
    <div>
      <header>
        <h2>Welcome, {userData.fullname}</h2>
        <p>{message}</p>
      </header>
    </div>
  )
}
