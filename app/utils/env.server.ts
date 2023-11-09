import { parseEnv } from "znv"
import { z } from "zod"

// eslint-disable-next-line node/no-process-env
export const parsedEnv = parseEnv(process.env, {
  // For app
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .optional()
    .default("development"),
  APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1),
  SESSION_SECRET: z.string().min(1),

  // For services
  RESEND_API_KEY: z.string().optional(),
  UPLOADCARE_PUBLIC_KEY: z.string().optional(),

  // For auth
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
})

export const isDevelopment = parsedEnv.NODE_ENV === "development"
export const isProduction = parsedEnv.NODE_ENV === "production"
