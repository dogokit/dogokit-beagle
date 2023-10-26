import { Link } from "@remix-run/react"

import { cn } from "~/utils/cn"
import { Logo } from "../shared/logo"

export function SiteNavigation() {
	return (
		<nav
			className={cn(
				"sticky top-0 z-10 flex bg-background px-4 py-2 shadow-md shadow-primary-foreground/5",
			)}
		>
			<div>
				<Link to="/">
					<Logo />
				</Link>
			</div>
		</nav>
	)
}
