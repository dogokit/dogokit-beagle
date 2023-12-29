import { json } from "@remix-run/node"

import { modelPost } from "~/models/post.server"

export async function loader() {
  const posts = await modelPost.getAllSlugs()
  return json(posts.map(post => post.slug))
}
