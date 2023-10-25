import { type LinksFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLocation,
} from '@remix-run/react'

import { SiteLayout } from '~/components/layout/site-layout'
import { configDocumentLinks } from '~/configs/document'

export const links: LinksFunction = () => configDocumentLinks

export default function App() {
	const location = useLocation()
	const isDashboard = location.pathname.startsWith('/dashboard')

	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				{isDashboard ? (
					<Outlet />
				) : (
					<SiteLayout>
						<Outlet />
					</SiteLayout>
				)}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
