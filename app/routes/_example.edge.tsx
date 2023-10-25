import { type MetaFunction } from '@remix-run/node'

export const config = { runtime: 'edge' }

export const meta: MetaFunction = () => [{ title: 'Remix@Edge' }]

export default function Edge() {
	return (
		<div>
			<h1>Welcome to Remix@Edge</h1>
		</div>
	)
}
