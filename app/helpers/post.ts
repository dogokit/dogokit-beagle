import { type Post } from "@prisma/client"

import { createNanoId, createSlug } from "~/utils/string"

export function createPostSlug(title: Post["title"]) {
  return `${createSlug(title)}-${createNanoId()}`
}

export function extractPostSlug(slug: Post["slug"]) {
  return slug.split("-").slice(0, -1).join("-")
}
