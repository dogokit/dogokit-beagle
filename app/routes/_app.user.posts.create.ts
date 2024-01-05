import { redirect, type ActionFunctionArgs } from "@remix-run/node"

import { requireUser } from "~/helpers/auth"
import { modelUserPost } from "~/models/user-post.server"
import { invariantResponse } from "~/utils/invariant"
import { createSitemap } from "~/utils/sitemap"
import { createTimer } from "~/utils/timer"

export const handle = createSitemap()

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const { userId } = await requireUser(request)

  const post = await modelUserPost.create({
    userId,
    title: "Untitled Post",
    content: "Insert some content here",
    statusSymbol: "DRAFT",
  })
  invariantResponse(post, "Post failed be create", { status: 400 })

  await timer.delay()
  return redirect(`/user/posts/${post.id}`)
}
