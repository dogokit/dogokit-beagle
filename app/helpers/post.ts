import { type Post } from "@prisma/client"

import { createNanoId, createSlug, truncateText } from "~/utils/string"

export function createPostSlug(title: Post["title"]) {
  return `${createSlug(title)}-${createNanoId()}`
}

export function extractPostSlug(slug: Post["slug"]) {
  return slug.split("-").slice(0, -1).join("-")
}

export function sanitizePosts(posts: Post[]) {
  return posts.map(post => ({
    ...post,
    content: truncateText(post.content, 140),
  }))
}
