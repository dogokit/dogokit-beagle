import { json, type LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData, type MetaFunction } from '@remix-run/react'

import { prisma } from '~/libs/db.server'

export const meta: MetaFunction = () => [{ title: 'Dogokit Users' }]

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const loader = async ({ request }: LoaderFunctionArgs) => {
	const [countUsers, users] = await prisma.$transaction([
		prisma.user.count(),
		prisma.user.findMany({ take: 50 }),
	])

	return json({ countUsers, users })
}

export default function RouteComponent() {
	const { countUsers, users } = useLoaderData<typeof loader>()

	return (
		<div className="container">
			<section className="prose-config">
				<h1>Users</h1>
				<pre>{JSON.stringify({ countUsers, users }, null, 2)}</pre>
			</section>
		</div>
	)
}
