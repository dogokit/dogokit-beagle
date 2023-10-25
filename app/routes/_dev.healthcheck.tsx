import { type LoaderFunctionArgs } from '@remix-run/node'

import { HTTPStatus } from '~/types/http-status'
import { prisma } from '~/libs/db.server'

export async function loader({ request }: LoaderFunctionArgs) {
	const host =
		request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

	try {
		const url = new URL(
			'/',
			process.env.NODE_ENV === 'development'
				? `http://${host}`
				: `https://${host}`,
		)

		// Connect to the database, make a simple query, HEAD request to self
		await Promise.all([
			prisma.user.count(),
			fetch(url.toString(), { method: 'HEAD' }).then(r => {
				if (!r.ok) return Promise.reject(r)
			}),
		])

		return new Response('OK')
	} catch (error: unknown) {
		console.info('Health Check ❌', { error })

		return new Response('ERROR', { status: HTTPStatus.INTERNAL_SERVER_ERROR })
	}
}
