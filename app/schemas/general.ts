import { z } from "zod"

export const id = z.string({ required_error: "ID is required" })

export const redirectTo = z.string().optional()

export const schemaGeneralId = z.object({ id })
