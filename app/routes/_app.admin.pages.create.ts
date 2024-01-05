import { redirect, type ActionFunctionArgs } from "@remix-run/node"

import { requireUser } from "~/helpers/auth"
import { modelAdminPage } from "~/models/admin-page.server"
import { invariantResponse } from "~/utils/invariant"
import { createSitemap } from "~/utils/sitemap"
import { createNanoId } from "~/utils/string"
import { createTimer } from "~/utils/timer"

export const handle = createSitemap()

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const { userId } = await requireUser(request)

  const page = await modelAdminPage.create({
    userId,
    slug: createNanoId(),
    title: "Untitled Page",
    description: "Type some description",
    content: "Insert some content here",
    statusSymbol: "DRAFT",
  })
  invariantResponse(page, "Page failed be create", { status: 400 })

  await timer.delay()
  return redirect(`/admin/pages/${page.id}`)
}
