import { getPostExcerpt } from "~/helpers/post"
import { db } from "~/libs/db.server"
import { debugCode } from "~/utils/string.server"

/**
 * Example utility to fix data
 *
 * local:
 * pnpm tsx prisma/utils/fix-posts.ts
 *
 * production:
 * pnpm dotenv -e .env.production tsx prisma/utils/fix-posts.ts
 */

async function fixPosts() {
  const posts = await db.post.findMany()

  for (const post of posts) {
    const updatedPost = await db.post.update({
      where: { id: post.id },
      data: { excerpt: getPostExcerpt(post.content) },
    })
    console.info(`🪧 Updated post with excerpt: ${updatedPost.id}`)
  }

  const updatedPosts = await db.post.findMany()
  debugCode(updatedPosts, false)
}

fixPosts()
