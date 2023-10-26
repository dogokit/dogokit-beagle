import { Icon } from "@iconify/react"
import { type MetaFunction } from "@remix-run/node"
import { Logo } from "~/components/shared/logo"

import { Anchor } from "~/components/ui/anchor"

export const meta: MetaFunction = () => [
	{ title: "Dogokit Remix" },
	{ name: "description", content: "🐶 Dogokit with 💿 Remix web app kit." },
]

export default function IndexRoute() {
	return (
		<div className="site-container space-y-20 py-20">
			<section className="space-y-10">
				<div className="text-icon">
					<Logo text="Dogokit Remix" size="xl" />
				</div>

				<p className="text-2xl sm:text-4xl">
					Remix web app kit by{" "}
					<Anchor withColor href="https://dogokit.com" className="font-bold">
						Dogokit
					</Anchor>
				</p>
			</section>

			<section className="prose-config">
				<h1 className="text-icon">
					<Icon icon="fluent-emoji:cat-face" />
					<span>Heading One</span>
				</h1>
				<p>
					This is the paragraph after heading one. Discussing about{" "}
					<Anchor href="https://dogokit.com">Dogokit</Anchor> and{" "}
					<Anchor href="https://remix.run">Remix</Anchor>.
				</p>
				<pre>console.log("Hello Inside 0123");</pre>

				<h2 className="text-icon">
					<Icon icon="fluent-emoji:bear" />
					<span>Heading Two</span>
				</h2>
				<p>
					Just another paragraph after heading two. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Culpa commodi amet aliquid eos placeat
					maiores quas dolor iusto accusamus laudantium sit molestiae facilis
					labore ipsam odit sapiente ex, dolore quis?
				</p>

				<h3 className="text-icon">
					<Icon icon="fluent-emoji:paw-prints" />
					<span>Heading Three</span>
				</h3>
				<p>
					The last paragraph after heading three. Lorem ipsum dolor sit amet
					consectetur adipisicing elit. Culpa commodi amet aliquid eos placeat
					maiores quas dolor iusto accusamus laudantium sit molestiae facilis
					labore ipsam odit sapiente ex, dolore quis?
				</p>
			</section>
		</div>
	)
}
