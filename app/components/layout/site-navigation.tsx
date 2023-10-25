import { Link } from "@remix-run/react"
import { Icon } from "@iconify/react"

import { cn } from "~/utils/cn"

export function SiteNavigation() {
	return (
		<nav
			className={cn(
				"sticky top-0 z-10 flex bg-background px-4 py-2 shadow-md shadow-primary-foreground/5",
			)}
		>
			<div>
				<Link to="/">
					<span className="flex items-center gap-2 text-3xl">
						<Icon icon="fluent-emoji:dog-face" />
						<span>Dogokit</span>
					</span>
				</Link>
			</div>
		</nav>
	)
}
