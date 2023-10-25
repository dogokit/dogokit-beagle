import { connect } from '@planetscale/database'
import { PrismaPlanetScale } from '@prisma/adapter-planetscale'
import { PrismaClient } from '@prisma/client'
import dotenv from 'dotenv'
import { fetch as undiciFetch } from 'undici'

import { parsedEnv } from '~/utils/env.server'

dotenv.config()
const connectionString = parsedEnv.DATABASE_URL

const connection = connect({ url: connectionString, fetch: undiciFetch })
const adapter = new PrismaPlanetScale(connection)

let prisma = new PrismaClient()

declare global {
	var __db__: PrismaClient | undefined
}

if (parsedEnv.NODE_ENV === 'production') {
	prisma = new PrismaClient({ adapter })
} else {
	if (!global.__db__) {
		global.__db__ = new PrismaClient()
	}
	prisma = global.__db__
	prisma.$connect()
}

export { prisma }
