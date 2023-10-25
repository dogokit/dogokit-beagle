import { parseEnv } from 'znv'
import { z } from 'zod'

// eslint-disable-next-line node/no-process-env
export const parsedEnv = parseEnv(process.env, {
	NODE_ENV: z
		.enum(['development', 'test', 'production'])
		.default('development')
		.optional(),
	APP_URL: z.string().url().default('http://localhost:3000'),
	DATABASE_URL: z.string().min(1),
	SESSION_SECRET: z.string().min(1),
	RESEND_API_KEY: z.string().optional(),
	UPLOADCARE_PUBLIC_KEY: z.string().optional(),
})
