import { type Post } from "@prisma/client"

import { createPostSlug, getPostExcerpt } from "~/helpers/post"
import { prisma } from "~/libs/db.server"
import { type PostStatusSymbol } from "~/types/post-status"

export const modelUserPost = {
  count({ userId }: Pick<Post, "userId">) {
    return prisma.post.count({
      where: { userId },
    })
  },

  getAll({ userId }: Pick<Post, "userId">) {
    return prisma.post.findMany({
      where: { userId },
      include: {
        images: { select: { url: true } },
      },
    })
  },

  getById({ id, userId }: Pick<Post, "id" | "userId">) {
    return prisma.post.findUnique({
      where: { id, userId },
      include: {
        status: { select: { symbol: true, name: true } },
        images: { select: { url: true } },
      },
    })
  },

  async create({
    userId,
    title,
    content,
    statusSymbol,
  }: Pick<Post, "userId" | "title" | "content"> & {
    statusSymbol: PostStatusSymbol
  }) {
    const status = await prisma.postStatus.findUnique({
      where: { symbol: statusSymbol },
    })
    if (!status) return null

    return prisma.post.create({
      data: {
        userId,
        slug: createPostSlug(title),
        title,
        content,
        excerpt: getPostExcerpt(content),
        statusId: status.id,
      },
      include: {
        status: true,
      },
    })
  },

  update({
    userId,
    id,
    slug,
    title,
    content,
  }: Pick<Post, "userId" | "id" | "slug" | "title" | "content">) {
    return prisma.post.update({
      where: { id },
      data: {
        userId,
        slug,
        title,
        content,
        excerpt: getPostExcerpt(content),
      },
    })
  },

  deleteAll({ userId }: Pick<Post, "userId">) {
    return prisma.post.deleteMany({ where: { userId } })
  },

  deleteById({ userId, id }: Pick<Post, "userId" | "id">) {
    return prisma.post.delete({ where: { id, userId } })
  },
}
