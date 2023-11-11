import { prisma } from "~/libs/db.server"

import { hashPassword } from "~/utils/encryption.server"
import { logEnv } from "~/utils/log.server"

import { createSlug } from "~/utils/string"
import dataCredentialUsers from "./credentials/users.json"
import dataPosts from "./data/posts.json"
import dataRoles from "./data/roles.json"

/**
 * Enable and disable seed items by commenting them
 */
const enabledSeedItems = [
  "permissions",
  "roles",
  // "userTags",
  "users",
  "posts",
]

async function main() {
  logEnv()

  const seeds: { [key: string]: () => Promise<any> } = {
    permissions: seedPermissions,
    roles: seedRoles,
    // userTags: seedUserTags,
    users: seedUsers,
    posts: seedPosts,
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
        await prisma.permission.create({
          data: { entity, action, access },
        })
      }
    }
  }

  console.timeEnd("🔑 Created permissions")
}

async function seedRoles() {
  console.info("\n👑 Seed roles")
  console.info("👑 Existing roles count", await prisma.role.count())
  console.time("👑 Upserted roles")

  for (const roleRaw of dataRoles) {
    const roleData = {
      symbol: roleRaw.symbol,
      name: roleRaw.name,
      permissions: {
        connect: await prisma.permission.findMany({
          select: { id: true },
          where: { access: roleRaw.permissionsAccess },
        }),
      },
    }

    await prisma.role.upsert({
      where: { symbol: roleRaw.symbol },
      create: roleData,
      update: roleData,
    })
  }

  console.timeEnd("👑 Upserted roles")
}

async function seedUsers() {
  console.info("\n👤 Seed users")
  console.info("👤 Existing users count", await prisma.user.count())

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

    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email },
      include: { password: { select: { hash: true } } },
    })

    const userHasPassword = Boolean(existingUser?.password?.hash)

    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        ...userData,
        password: userHasPassword
          ? { update: { hash: await hashPassword(credentialUser.password) } }
          : undefined,
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

async function seedPosts() {
  console.info("\n📜 Seed posts")
  console.info("📜 Existing posts count", await prisma.post.count())

  const users = await prisma.user.findMany({
    select: { id: true, username: true },
  })

  for (const postRaw of dataPosts) {
    const user = users.find(user => user.username === postRaw.username)
    if (!user) return null

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username, ...postWithoutUsername } = postRaw

    const slug = createSlug(postRaw.title + "-" + user.username)
    const postData = {
      slug,
      ...postWithoutUsername,
      userId: user.id,
    }

    const post = await prisma.post.upsert({
      where: { slug },
      update: postData,
      create: postData,
    })
    if (!post) return null

    console.info(`📜 Upserted post ${post.title} / ${post.slug}`)
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
