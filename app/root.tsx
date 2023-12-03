import {
  json,
  redirect,
  type HeadersFunction,
  type LinksFunction,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { ThemeProvider, type Theme } from "remix-themes"

import { GeneralErrorBoundary } from "~/components/shared/error-boundary"
import { configDocumentLinks } from "~/configs/document"
import { Document } from "~/document"
import { modelUser } from "~/models/user.server"
import { authenticator } from "~/services/auth.server"
import { themeSessionResolver } from "~/services/theme.server"
import { parsedEnvClient } from "~/utils/env.server"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: "Dogokit",
    description:
      "Web app template kit using Remix, React, Tailwind CSS, Radix UI, Prisma ORM, and more.",
  })

export const links: LinksFunction = () => configDocumentLinks

export const headers: HeadersFunction = () => {
  return { "Accept-CH": "Sec-CH-Prefers-Color-Scheme" }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { getTheme } = await themeSessionResolver(request)

  const userSession = await authenticator.isAuthenticated(request)
  if (!userSession) {
    return json({
      ENV: parsedEnvClient,
      theme: getTheme(),
    })
  }

  const userData = await modelUser.getForSession({ id: userSession.id })
  if (!userData) return redirect(`/logout`)

  return json({
    ENV: parsedEnvClient,
    theme: getTheme(),
    userSession,
    userData,
  })
}

export default function RootRoute() {
  const data = useLoaderData<typeof loader>()

  return (
    <ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
      <Document dataTheme={data.theme}>
        <Outlet />
      </Document>
    </ThemeProvider>
  )
}

export function ErrorBoundary() {
  return (
    <ThemeProvider
      specifiedTheme={"light" as Theme}
      themeAction="/action/set-theme"
    >
      <Document>
        <GeneralErrorBoundary />
      </Document>
    </ThemeProvider>
  )
}
