import { z } from "zod"

const id = z.string({ required_error: "Page ID is required" })

const slug = z
  .string({ required_error: "Slug is required" })
  .min(1, "Slug require at least 1 character")
  .max(100, "Slug limited to 100 characters")

const title = z.string({ required_error: "Title is required" })

const description = z.string({ required_error: "Description is required" })

const content = z.string({ required_error: "Content is required" })

const statusSymbol = z.string({ required_error: "Status symbol is required" })

export const schemaPage = z.object({
  id,
  slug,
  title,
  description,
  content,
})

export const schemaPageStatusUpdate = z.object({
  pageId: id,
  statusSymbol,
})

export const schemaPageDeleteById = z.object({ id })
