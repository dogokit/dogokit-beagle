import {
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node"

import { requireUserId } from "~/helpers/auth"
import { modelUserPost } from "~/models/user-post.server"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const post = await modelUserPost.create({
    userId,
    title: "Untitled Post",
    content: "Insert some content here",
  })
  return redirect(`/user/posts/${post.id}`)
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const userId = await requireUserId(request)
  const post = await modelUserPost.create({
    userId,
    title: "Untitled Post",
    content: "Insert some content here",
  })
  return redirect(`/user/posts/${post.id}`)
}
