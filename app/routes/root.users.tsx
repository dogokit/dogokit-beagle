import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData, type MetaFunction } from "@remix-run/react"

import { prisma } from "~/libs/db.server"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `Users`,
    description: `List of public users`,
  })

export const loader = async ({}: LoaderFunctionArgs) => {
  const [usersCount, users] = await prisma.$transaction([
    prisma.user.count(),
    prisma.user.findMany({ take: 50 }),
  ])

  return json({ usersCount, users })
}

export default function RootUsersRoute() {
  const { usersCount, users } = useLoaderData<typeof loader>()

  return (
    <div className="container">
      <section className="prose-config">
        <h1>Users</h1>
        <pre>{JSON.stringify({ usersCount, users }, null, 2)}</pre>
      </section>
    </div>
  )
}
