import { type Page } from "@prisma/client"

import { db } from "~/libs/db.server"
import { type PageStatusSymbol } from "~/types/page-status"

export const modelAdminPage = {
  count() {
    return db.page.count()
  },

  getAll() {
    return db.page.findMany()
  },

  getById({ id }: Pick<Page, "id">) {
    return db.page.findUnique({
      where: { id },
      include: {
        status: { select: { symbol: true, name: true } },
      },
    })
  },

  async create({
    userId,
    slug,
    title,
    description,
    content,
    statusSymbol,
  }: Pick<Page, "userId" | "slug" | "title" | "description" | "content"> & {
    statusSymbol: PageStatusSymbol
  }) {
    const status = await db.pageStatus.findUnique({
      where: { symbol: statusSymbol },
    })
    if (!status) return null

    return db.page.create({
      data: {
        userId,
        slug,
        title,
        description,
        content,
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
  }: Pick<Page, "userId" | "id" | "slug" | "title" | "content">) {
    return db.page.update({
      where: { id },
      data: {
        userId,
        slug,
        title,
        content,
      },
    })
  },

  deleteAll() {
    return db.page.deleteMany()
  },

  deleteById({ id }: Pick<Page, "id">) {
    return db.page.delete({ where: { id } })
  },

  updateStatus({ userId, id, statusId }: Pick<Page, "userId" | "id" | "statusId">) {
    return db.page.update({
      where: { id },
      data: {
        userId,
        statusId,
      },
    })
  },
}
