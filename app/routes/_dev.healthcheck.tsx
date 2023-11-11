import { type LoaderFunctionArgs } from "@remix-run/node"
import { type MetaFunction } from "@remix-run/react"

import { prisma } from "~/libs/db.server"
import { HTTPStatus } from "~/types/http-status"
import { parsedEnv } from "~/utils/env.server"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () => createMeta({ title: `Health Check` })

export async function loader({ request }: LoaderFunctionArgs) {
  const host =
    request.headers.get("X-Forwarded-Host") ?? request.headers.get("host")

  try {
    const url = new URL(
      "/",
      parsedEnv.NODE_ENV === "development"
        ? `http://${host}`
        : `https://${host}`,
    )

    // Connect to the database, make a simple query, HEAD request to self
    await Promise.all([
      prisma.user.count(),
      fetch(url.toString(), { method: "HEAD" }).then(response => {
        if (!response.ok) return Promise.reject(response)
      }),
    ])

    return new Response("HEALTH CHECK: OK")
  } catch (error: unknown) {
    console.info("HEALTH CHECK: ERROR", { error })

    return new Response("ERROR", { status: HTTPStatus.INTERNAL_SERVER_ERROR })
  }
}
