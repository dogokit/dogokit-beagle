import { prisma } from "~/libs/db.server"

import { hashPassword } from "~/utils/encryption.server"
import { logEnv } from "~/utils/log.server"

import dataCredentialUsers from "./credentials/users.json"
import dataRoles from "./data/roles.json"

// TODO: Replace most deleteMany() with upsert logic

/**
 * Enable and disable seed items by commenting them
 */
const enabledSeedItems = ["permissions", "roles", "users"]

async function main() {
  logEnv()

  const seeds: { [key: string]: () => Promise<any> } = {
    permissions: seedPermissions,
    roles: seedRoles,
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

async function seedPermissions() {
  console.info("\n🔑 Seed permissions")
  console.info("🔑 Existing permissions count", await prisma.permission.count())
  console.info(
    "🔑 Deleted existing permissions",
    await prisma.permission.deleteMany(),
  )

  console.time("🔑 Created permissions")

  const entities = ["USER", "NOTE"]
  const actions = ["CREATE", "READ", "UPDATE", "DELETE"]
  const accesses = ["OWN", "ANY"] as const

  for (const entity of entities) {
    for (const action of actions) {
      for (const access of accesses) {
        await prisma.permission.create({ data: { entity, action, access } })
      }
    }
  }

  console.timeEnd("🔑 Created permissions")
}

async function seedRoles() {
  console.info("\n👑 Seed roles")
  console.info("👑 Existing roles count", await prisma.role.count())
  console.info("👑 Deleted existing roles", await prisma.role.deleteMany())

  console.time("👑 Created roles")

  for (const role of dataRoles) {
    await prisma.role.create({
      data: {
        symbol: role.symbol,
        name: role.name,
        permissions: {
          connect: await prisma.permission.findMany({
            select: { id: true },
            where: { access: role.permissionsAccess },
          }),
        },
      },
    })
  }

  console.timeEnd("👑 Created roles")
}

async function seedUsers() {
  console.info("\n👤 Seed users")
  console.info("👤 Existing users count", await prisma.user.count())
  console.info("👤 Deleted existing users", await prisma.user.deleteMany())

  if (!Array.isArray(dataCredentialUsers)) {
    console.error(`🔴 Please create prisma/credentials/users.json file`)
    console.error(`🔴 Check README for the guide`)
    return null
  }

  /**
   * Upsert (update or insert/create if new) the users with complete fields
   */
  for (const credentialUser of dataCredentialUsers) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = credentialUser

    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        ...userData,
        password: {
          update: { hash: await hashPassword(credentialUser.password) },
        },
      },
      create: {
        ...userData,
        password: {
          create: { hash: await hashPassword(credentialUser.password) },
        },
      },
    })
    if (!user) return null

    console.info(`👤 Upserted user ${user.email} / @${user.username}`)
  }
}

main()
  .then(async () => {
    console.info("\n🏁 Seeding complete")
    await prisma.$disconnect()
  })
  .catch(e => {
    console.error(e)
    console.error("\n⛔ Seeding failed")
    prisma.$disconnect()
    process.exit(1)
  })
