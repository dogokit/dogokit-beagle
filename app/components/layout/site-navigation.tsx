import { Link } from "@remix-run/react"
import { useTheme } from "remix-themes"

import { Logo } from "~/components/shared/logo"
import { cn } from "~/utils/cn"
import { formatStringCode } from "~/utils/format-string"

export function SiteNavigation() {
	const [theme] = useTheme()

	return (
		<nav
			className={cn(
				"sticky top-0 z-10",
				"flex items-center justify-between gap-2",
				"px-4 py-2",
				"bg-secondary",
			)}
		>
			<div>
				<Link to="/">
					<Logo />
				</Link>
			</div>

			<span>{formatStringCode(theme)}</span>
		</nav>
	)
}
