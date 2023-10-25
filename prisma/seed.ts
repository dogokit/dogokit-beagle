import { prisma } from '~/libs/db.server'

import dataCredentialUsers from './credential/users.json'

/**
 * Enable and disable seed items by commenting in/out the enabled items
 */
const enabledSeedItems = [
	// "userRoles",
	// "userTags",
	'users',
]

async function main() {
	const seeds: { [key: string]: () => Promise<any> } = {
		// userRoles: seedUserRoles,
		// userTags: seedUserTags,
		users: seedUsers,
	}

	for (const seedName of enabledSeedItems) {
		const seed = seeds[seedName]
		if (seed) {
			await seed()
		}
	}
}

async function seedUsers() {
	console.info('🔵 👤 Seed users...')
	const usersCount = await prisma.user.count()
	console.info('🔵 👤 Users count:', usersCount)

	if (!Array.isArray(dataCredentialUsers)) {
		console.error(`🔴 Please create prisma/credential/users.json file`)
		console.error(`🔴 Check README for the guide`)
		return null
	}

	await prisma.user.deleteMany()
	console.info('🟡 👤 Deleted existing users')

	const dataCredentialUsersConfigured = dataCredentialUsers.map(item => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...user } = item
		return user
	})

	// Upsert (update or insert/create if new) the users with complete fields
	for (const user of dataCredentialUsersConfigured) {
		const upsertedUser = await prisma.user.upsert({
			where: { email: user.email },
			update: user,
			create: user,
		})
		if (!upsertedUser) return null
		console.info(`✅ 👤 User "${upsertedUser.email}" upserted`)
	}
}

main()
	.then(async () => {
		console.info('🏁 Seeding complete')
		await prisma.$disconnect()
	})
	.catch(e => {
		console.error(e)
		console.error('⛔ Seeding failed')
		prisma.$disconnect()
		process.exit(1)
	})
