import { prisma } from "~/libs/db.server"
import { parsedEnv } from "~/utils/env.server"

async function checkEnv() {
	const { NODE_ENV, APP_URL, DATABASE_URL } = parsedEnv

	console.info("🐶 Dogokit Remix")
	console.info("⚫︎ NODE_ENV:", NODE_ENV)
	console.info("⚫︎ APP_URL:", APP_URL)
	console.info("⚫︎ DATABASE_URL:", DATABASE_URL)

	await prisma.$queryRaw`SELECT 1`
}

checkEnv()
