import { type MetaFunction } from "@remix-run/node"

import { Logo } from "~/components/shared/logo"

export const meta: MetaFunction = () => [
	{ title: "Dogokit" },
	{ name: "description", content: "🐶 Dogokit demo app." },
]

export default function IndexRoute() {
	return (
		<div className="site-container space-y-20 py-20">
			<section className="space-y-10">
				<Logo text="Dogokit" size="xl" />

				<p className="text-2xl sm:text-4xl">Demo application</p>
			</section>
		</div>
	)
}
