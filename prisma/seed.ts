import { createPostSlug, extractPostSlug, getPostExcerpt } from "~/helpers/post"
import { db } from "~/libs/db.server"
import { hashPassword } from "~/utils/encryption.server"
import { logEnv } from "~/utils/log.server"
import { createSlug } from "~/utils/string"

import { dataCredentialUsers } from "./credentials/users"
import { dataPostStatuses } from "./data/post-statuses"
import { dataPosts } from "./data/posts"
import { dataRoles } from "./data/roles"

/**
 * EDITME: Enable or disable seed items by commenting them
 */
const enabledSeedItems = [
  "permissions",
  "roles",
  "users",
  "postStatuses",
  "posts",
]

async function main() {
  logEnv()

  const seeds: { [key: string]: () => Promise<any> } = {
    permissions: seedPermissions,
    roles: seedRoles,
    users: seedUsers,
    postStatuses: seedPostStatuses,
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
  console.info("🔑 Count permissions", await db.permission.count())
  console.info("🔑 Deleted permissions", await db.permission.deleteMany())

  console.time("🔑 Created permissions")

  const entities = ["USER", "NOTE"]
  const actions = ["CREATE", "READ", "UPDATE", "DELETE"]
  const accesses = ["OWN", "ANY"] as const

  for (const entity of entities) {
    for (const action of actions) {
      for (const access of accesses) {
        await db.permission.create({
          data: { entity, action, access },
        })
      }
    }
  }

  console.timeEnd("🔑 Created permissions")
}

async function seedRoles() {
  console.info("\n👑 Seed roles")
  console.info("👑 Count roles", await db.role.count())
  // console.info("👑 Deleted roles", await prisma.role.deleteMany())
  console.time("👑 Upserted roles")

  for (const roleRaw of dataRoles) {
    const roleData = {
      symbol: roleRaw.symbol,
      name: roleRaw.name,
      permissions: {
        connect: await db.permission.findMany({
          select: { id: true },
          where: { access: roleRaw.permissionsAccess },
        }),
      },
    }

    const role = await db.role.upsert({
      where: { symbol: roleRaw.symbol },
      create: roleData,
      update: roleData,
    })

    console.info(`👑 Upserted role ${role.symbol} / ${role.name}`)
  }

  console.timeEnd("👑 Upserted roles")
}

async function seedUsers() {
  console.info("\n👤 Seed users")
  console.info("👤 Count users", await db.user.count())
  // console.info("👤 Deleted users", await prisma.user.deleteMany())

  if (!Array.isArray(dataCredentialUsers)) {
    console.error(`🔴 Please create prisma/credentials/users.ts file`)
    console.error(`🔴 Check README for the guide`)
    return null
  }

  for (const userCredential of dataCredentialUsers) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, roleSymbol, ...userRaw } = userCredential

    const userData = {
      ...userRaw,
      roles: { connect: { symbol: userCredential.roleSymbol } },
    }

    const existingUser = await db.user.findUnique({
      where: { email: userData.email },
      include: { password: { select: { hash: true } } },
    })

    const userHasPassword = Boolean(existingUser?.password?.hash)

    const user = await db.user.upsert({
      where: { email: userData.email },
      update: {
        ...userData,
        password: userHasPassword
          ? { update: { hash: await hashPassword(userCredential.password) } }
          : undefined,
      },
      create: {
        ...userData,
        password: userHasPassword
          ? { create: { hash: await hashPassword(userCredential.password) } }
          : undefined,
      },
    })

    if (!user) return null

    console.info(`👤 Upserted user ${user.email} / @${user.username}`)
  }
}

async function seedPostStatuses() {
  console.info("\n🪧 Seed post statuses")
  console.info("🪧 Count post statuses", await db.postStatus.count())
  // console.info("🪧 Deleted post statuses", await prisma.postStatus.deleteMany())
  console.time("🪧 Upserted post statuses")

  for (const statusRaw of dataPostStatuses) {
    const status = await db.postStatus.upsert({
      where: { symbol: statusRaw.symbol },
      create: statusRaw,
      update: statusRaw,
    })
    console.info(`🪧 Upserted post status ${status.symbol} / ${status.name}`)
  }
  console.timeEnd("🪧 Upserted post statuses")
}

async function seedPosts() {
  console.info("\n📜 Seed posts")
  console.info("📜 Count posts", await db.post.count())
  console.info("📜 Deleted posts", await db.post.deleteMany())

  const users = await db.user.findMany({
    select: { id: true, username: true },
  })

  const posts = await db.post.findMany({
    select: { id: true, slug: true },
  })

  const postStatuses = await db.postStatus.findMany({
    select: { id: true, symbol: true },
  })

  for (const postRaw of dataPosts) {
    const user = users.find(user => user.username === postRaw.username)
    if (!user) return null

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { username, statusSymbol, ...postSanitized } = postRaw

    const slug = createSlug(postRaw.title) // original-slug
    const postSlug = createPostSlug(postRaw.title) // modified-slug-nanoid123
    const existingPost = posts.find(post => {
      return slug === extractPostSlug(post.slug)
    })
    const status = postStatuses.find(
      status => status.symbol === postRaw.statusSymbol,
    )
    if (!status) return null

    const postData = {
      ...postSanitized,
      // Reuse the same post slug if it already exists
      slug: existingPost?.slug || postSlug,
      excerpt: getPostExcerpt(postSanitized.content),
      userId: user.id,
      statusId: status.id,
    }

    const post = await db.post.upsert({
      where: { slug: postData.slug },
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
    await db.$disconnect()
  })
  .catch(e => {
    console.error(e)
    console.error("\n⛔ Seeding failed")
    db.$disconnect()
    process.exit(1)
  })
