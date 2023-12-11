import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData, type MetaFunction } from "@remix-run/react"

import { prisma } from "~/libs/db.server"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `Users`,
    description: `List of users`,
  })

export const loader = async ({}: LoaderFunctionArgs) => {
   // IDEA: Refactor this into a model
  const [usersCount, users] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({ take: 50 }),
  ])

  return json({ usersCount, users })
}

export default function RootUsersRoute() {
  const { usersCount, users } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Users</h1>
        <pre>{JSON.stringify({ usersCount, users }, null, 2)}</pre>
      </header>
    </div>
  )
}
