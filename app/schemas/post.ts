import { z } from "zod"
import { zfd } from "zod-form-data"

import { userId } from "~/schemas/general"

const id = z.string({ required_error: "Post ID is required" })

// IDEA: Prepare trim slug function
const slug = z
  .string({ required_error: "Slug is required" })
  .min(1, "Slug require at least 1 character")
  .max(100, "Slug limited to 100 characters")

const title = z.string({ required_error: "Title is required" })

const content = z.string({ required_error: "Content is required" })

const readingTime = zfd.numeric(z.number().min(0).max(1000)).optional()

export const schemaPost = z.object({
  userId,
  id,
  slug,
  title,
  content,
  readingTime,
})

export const schemaPostDeleteAll = z.object({ userId })

export const schemaPostDeleteById = z.object({ userId, id })
