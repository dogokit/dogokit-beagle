import { type Post } from "@prisma/client"
import { stripHtml } from "string-strip-html"

import { createNanoId, createSlug, truncateText } from "~/utils/string"

export function createPostSlug(title: Post["title"]) {
  return `${createSlug(title)}-${createNanoId()}`
}

export function extractPostSlug(slug: Post["slug"]) {
  return slug.split("-").slice(0, -1).join("-")
}

/**
 * IDEA: Model Post would have excerpt/summary
 * So only need to sanitize on save, not on read
 */
export function getPostExcerpt(content: string) {
  return truncateText(stripHtml(content).result, 100)
}
