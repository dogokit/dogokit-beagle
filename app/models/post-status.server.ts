import { type PostStatus } from "@prisma/client"

import { prisma } from "~/libs/db.server"

export const modelPostStatus = {
  count() {
    return prisma.postStatus.count()
  },

  getAll() {
    return prisma.postStatus.findMany()
  },

  getById({ id }: Pick<PostStatus, "id">) {
    return prisma.postStatus.findUnique({
      where: { id },
    })
  },

  getBySymbol({ symbol }: Pick<PostStatus, "symbol">) {
    return prisma.postStatus.findUnique({
      where: { symbol },
    })
  },

  create({
    sequence,
    symbol,
    name,
    description,
  }: Pick<PostStatus, "sequence" | "symbol" | "name" | "description">) {
    return prisma.postStatus.create({
      data: {
        sequence,
        symbol,
        name,
        description,
      },
    })
  },

  update({
    id,
    sequence,
    symbol,
    name,
    description,
  }: Pick<PostStatus, "id" | "sequence" | "symbol" | "name" | "description">) {
    return prisma.postStatus.update({
      where: { id },
      data: {
        sequence,
        symbol,
        name,
        description,
      },
    })
  },

  deleteAll() {
    return prisma.postStatus.deleteMany()
  },

  deleteById({ id }: Pick<PostStatus, "id">) {
    return prisma.postStatus.delete({
      where: { id },
    })
  },
}
