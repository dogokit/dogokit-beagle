import { z } from "zod"

export const id = z.string({ required_error: "ID is required" })

export const userId = z.string({ required_error: "User ID is required" })

const intent = z.string().optional()

export const redirectTo = z.string().optional()

export const schemaGeneralId = z.object({ id, intent })
