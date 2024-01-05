import { type PostStatus } from "@prisma/client"

import { db } from "~/libs/db.server"

export const modelPostStatus = {
  count() {
    return db.postStatus.count()
  },

  getAll() {
    return db.postStatus.findMany({
      orderBy: { sequence: "asc" },
    })
  },

  getById({ id }: Pick<PostStatus, "id">) {
    return db.postStatus.findUnique({
      where: { id },
    })
  },

  getBySymbol({ symbol }: Pick<PostStatus, "symbol">) {
    return db.postStatus.findUnique({
      where: { symbol },
    })
  },

  create({
    sequence,
    symbol,
    name,
    description,
  }: Pick<PostStatus, "sequence" | "symbol" | "name" | "description">) {
    return db.postStatus.create({
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
    return db.postStatus.update({
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
    return db.postStatus.deleteMany()
  },

  deleteById({ id }: Pick<PostStatus, "id">) {
    return db.postStatus.delete({
      where: { id },
    })
  },
}
