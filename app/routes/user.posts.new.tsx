import { json, type LoaderFunctionArgs } from "@remix-run/node"

import { requireUser } from "~/helpers/auth"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // TODO: Create a new post, then redirect to new post ID
  return json({ user: await requireUser(request) })
}
