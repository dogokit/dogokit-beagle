import { z } from "zod"

import { userId } from "~/schemas/general"

const id = z.string({ required_error: "Post ID is required" })

const slug = z
  .string({ required_error: "Slug is required" })
  .regex(
    /^[a-zA-Z0-9-_]+$/,
    "Only alphabet, number, dot, dash, underscore allowed",
  )
// .min(1, "Slug require at least 1 character")
// .max(100, "Slug limited to 100 characters")
// LATER: Prepare trim slug function

const title = z.string({ required_error: "Title is required" })

const content = z.string({ required_error: "Content is required" })

export const schemaPostUpdate = z.object({
  userId,
  id,
  slug,
  title,
  content,
})
