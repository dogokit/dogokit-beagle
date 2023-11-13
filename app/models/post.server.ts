import { type Post } from "@prisma/client"

import { prisma } from "~/libs/db.server"

export { type Post } from "@prisma/client"

export const modelPost = {
  count() {
    return prisma.post.count()
  },

  getAll() {
    return prisma.post.findMany({
      include: {
        images: { select: { url: true } },
      },
    })
  },

  getById({ id }: Pick<Post, "id">) {
    return prisma.post.findUnique({
      where: { id },
      include: {
        images: { select: { url: true } },
      },
    })
  },

  getBySlug({ slug }: Pick<Post, "slug">) {
    return prisma.post.findUnique({
      where: { slug },
      include: {
        images: { select: { url: true } },
      },
    })
  },

  search({ q }: { q: string | undefined }) {
    return prisma.post.findMany({
      where: {
        OR: [{ title: { contains: q } }, { slug: { contains: q } }],
      },
      include: {
        images: { select: { url: true } },
      },
      orderBy: [{ updatedAt: "asc" }],
    })
  },

  deleteById({ id }: Pick<Post, "id">) {
    return prisma.post.delete({ where: { id } })
  },
}
