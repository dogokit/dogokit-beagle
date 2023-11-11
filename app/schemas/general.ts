import { z } from "zod"

const id = z.string({ required_error: "ID is required" })

export const schemaGeneralId = z.object({ id })
