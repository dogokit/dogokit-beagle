import { type Post } from "@prisma/client"

import { createPostSlug, getPostExcerpt } from "~/helpers/post"
import { db } from "~/libs/db.server"
import { type PostStatusSymbol } from "~/types/post-status"

export const modelUserPost = {
  count({ userId }: Pick<Post, "userId">) {
    return db.post.count({
      where: { userId },
    })
  },

  getAll({ userId }: Pick<Post, "userId">) {
    return db.post.findMany({
      where: { userId },
      include: {
        images: { select: { id: true, url: true } },
      },
    })
  },

  getById({ id, userId }: Pick<Post, "id" | "userId">) {
    return db.post.findUnique({
      where: { id, userId },
      include: {
        status: { select: { symbol: true, name: true } },
        images: { select: { id: true, url: true } },
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
    const status = await db.postStatus.findUnique({
      where: { symbol: statusSymbol },
    })
    if (!status) return null

    return db.post.create({
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
    return db.post.update({
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
    return db.post.deleteMany({ where: { userId } })
  },

  deleteById({ userId, id }: Pick<Post, "userId" | "id">) {
    return db.post.delete({ where: { id, userId } })
  },

  updateStatus({ userId, id, statusId }: Pick<Post, "userId" | "id" | "statusId">) {
    return db.post.update({
      where: { userId, id },
      data: { statusId },
    })
  },
}
