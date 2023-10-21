import { prisma } from '~/libs/db.server'

async function main() {
	//
}

main()
	.then(async () => {
		console.log('Seeding complete')
		await prisma.$disconnect()
	})
	.catch(e => {
		console.error(e)
		console.log('Seeding failed')
		prisma.$disconnect()
		process.exit(1)
	})
