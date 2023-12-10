import { getPostExcerpt } from "~/helpers/post"
import { prisma } from "~/libs/db.server"
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
  const posts = await prisma.post.findMany()

  for (const post of posts) {
    const updatedPost = await prisma.post.update({
      where: { id: post.id },
      data: { excerpt: getPostExcerpt(post.content) },
    })
    console.info(`🪧 Updated post with excerpt: ${updatedPost.id}`)
  }

  const updatedPosts = await prisma.post.findMany()
  debugCode(updatedPosts)
}

fixPosts()
