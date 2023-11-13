import { type Post } from "@prisma/client"

import { prisma } from "~/libs/db.server"

export { type Post } from "@prisma/client"

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
        images: { select: { url: true } },
      },
    })
  },

  deleteById({ id, userId }: Pick<Post, "id" | "userId">) {
    return prisma.post.delete({ where: { id, userId } })
  },
}
