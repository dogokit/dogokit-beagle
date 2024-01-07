import { z } from "zod"
import { zfd } from "zod-form-data"

const id = z.string({ required_error: "Post ID is required" })

const slug = z
  .string({ required_error: "Slug is required" })
  .min(1, "Slug require at least 1 character")
  .max(100, "Slug limited to 100 characters")

const title = z.string({ required_error: "Title is required" })

const content = z.string({ required_error: "Content is required" })

const statusSymbol = z.string({ required_error: "Status symbol is required" })

const readingTime = zfd.numeric(z.number().min(0).max(1000)).optional()

export const schemaPost = z.object({
  id,
  slug,
  title,
  content,
  readingTime,
})

export const schemaPostStatusUpdate = z.object({
  postId: id,
  statusSymbol,
})

export const schemaPostDeleteAll = z.object({})

export const schemaPostDeleteById = z.object({ id })
