import { type MetaFunction } from '@remix-run/node'
import { Icon } from '@iconify/react'

import { Anchor } from '~/components/ui/anchor'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Dogokit Remix' },
		{ name: 'description', content: '🐶 Dogokit with 💿 Remix web app kit.' },
	]
}

export default function Index() {
	return (
		<div className="container space-y-20 py-20">
			<section className="space-y-10">
				<h1>🐶 Dogokit Remix</h1>
				<h2>
					The main Remix web app kit by{' '}
					<Anchor withColor href="https://dogokit.com">
						🐶 Dogokit
					</Anchor>{' '}
					team
				</h2>
			</section>

			<section className="prose-config">
				<h2 className="inline-flex items-center gap-2">
					<Icon icon="mdi:home" />
					<span>Heading Two</span>
				</h2>
				<p>
					This is the paragraph after heading two. Which you can here.
					Discussing about this{' '}
					<Anchor href="https://dogokit.com">Dogokit</Anchor> and{' '}
					<Anchor href="https://remix.run">Remix</Anchor>. Lorem ipsum dolor sit
					amet consectetur adipisicing elit. Culpa commodi amet aliquid eos
					placeat maiores quas dolor iusto accusamus laudantium sit molestiae
					facilis labore ipsam odit sapiente ex, dolore quis?
				</p>
			</section>
		</div>
	)
}
