import { prisma } from '~/libs/db.server'

async function checkEnv() {
	console.info('🟣 Check environment variables')

	const queryResult = await prisma.$queryRaw`SELECT 1`
	console.info('🔵 Query result:', queryResult)
}

checkEnv()
