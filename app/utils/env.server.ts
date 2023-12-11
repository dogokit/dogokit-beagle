import { parseEnv } from "znv"
import { z } from "zod"

// eslint-disable-next-line node/no-process-env
export const parsedEnv = parseEnv(process.env, {
  // For app
  NODE_ENV: z
    .enum(["", "development", "test", "preview", "staging", "production"])
    .optional(),
  APP_URL: z.string().url().optional().default("http://localhost:3000"),
  SESSION_SECRET: z.string().min(1),

  // For database
  DATABASE_URL: z.string().min(1),
  DATABASE_BRANCH: z
    .enum(["", "local", "dev", "staging", "test", "main"])
    .optional(),

  // For OAuth
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),

  // For services
  RESEND_KEY: z.string().optional(),
  UPLOADCARE_KEY: z.string().optional(),
  POSTHOG_KEY: z.string().optional(),
})

/**
 * For client-side usage only, that can be retrieved through the root loader
 * using useRootLoaderData() hook
 */
export const parsedEnvClient = {
  NODE_ENV: parsedEnv.NODE_ENV,
  UPLOADCARE_KEY: parsedEnv.UPLOADCARE_KEY,
  POSTHOG_KEY: parsedEnv.POSTHOG_KEY,
}

export const isDevelopment = parsedEnv.NODE_ENV === "development"
export const isProduction = parsedEnv.NODE_ENV === "production"
