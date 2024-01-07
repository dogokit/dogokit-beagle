import { type PageStatus } from "@prisma/client"

import { db } from "~/libs/db.server"

export const modelPageStatus = {
  count() {
    return db.pageStatus.count()
  },

  getAll() {
    return db.pageStatus.findMany({
      orderBy: { sequence: "asc" },
    })
  },

  getById({ id }: Pick<PageStatus, "id">) {
    return db.pageStatus.findUnique({
      where: { id },
    })
  },

  getBySymbol({ symbol }: Pick<PageStatus, "symbol">) {
    return db.pageStatus.findUnique({
      where: { symbol },
    })
  },

  create({
    sequence,
    symbol,
    name,
    description,
  }: Pick<PageStatus, "sequence" | "symbol" | "name" | "description">) {
    return db.pageStatus.create({
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
  }: Pick<PageStatus, "id" | "sequence" | "symbol" | "name" | "description">) {
    return db.pageStatus.update({
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
    return db.pageStatus.deleteMany()
  },

  deleteById({ id }: Pick<PageStatus, "id">) {
    return db.pageStatus.delete({
      where: { id },
    })
  },
}
