import { Prisma, type User } from "@prisma/client"
import { type z } from "zod"

import { prisma } from "~/libs/db.server"
import {
  type schemaUserUpdateEmail,
  type schemaUserUpdateFullName,
  type schemaUserUpdateNickName,
  type schemaUserUpdateUsername,
} from "~/schemas/user"
import { hashPassword } from "~/utils/encryption.server"
import { getPlaceholderAvatarImageURL } from "~/utils/placeholder"

export { type User } from "@prisma/client"

export const modelUser = {
  count() {
    return prisma.user.count()
  },

  getAllUsernames() {
    return prisma.user.findMany({
      select: {
        id: true,
        username: true,
        updatedAt: true,
      },
    })
  },

  getForSession({ id }: Pick<User, "id">) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        fullname: true,
        username: true,
        // nickname: true,
        email: true,
        roles: { select: { symbol: true, name: true } },
        images: { select: { url: true } },
      },
    })
  },

  getById({ id }: Pick<User, "id">) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        roles: { select: { symbol: true, name: true } },
        images: { select: { id: true, url: true } },
      },
    })
  },

  getByUsername({ username }: Pick<User, "username">) {
    return prisma.user.findUnique({
      where: { username },
      include: {
        profiles: true,
        roles: { select: { symbol: true, name: true } },
        images: { select: { id: true, url: true } },
      },
    })
  },

  getByEmail({ email }: Pick<User, "email">) {
    return prisma.user.findUnique({
      where: { email },
      select: { id: true, images: { select: { url: true } } },
    })
  },

  search({ q }: { q: string | undefined }) {
    return prisma.user.findMany({
      where: {
        OR: [{ fullname: { contains: q } }, { username: { contains: q } }],
      },
      select: {
        id: true,
        fullname: true,
        username: true,
        images: { select: { url: true } },
      },
      orderBy: [{ updatedAt: "asc" }],
    })
  },

  async signup({
    email,
    fullname,
    username,
    password,
  }: Pick<User, "fullname" | "username" | "email"> & {
    password: string // unencrypted password at first
    inviteBy?: string
    inviteCode?: string
  }) {
    // The logic is in Conform Zod validation
    return prisma.user.create({
      data: {
        fullname: fullname.trim(),
        username: username.trim(),
        email: email.trim(),
        password: { create: { hash: await hashPassword(password) } },
        roles: { connect: { symbol: "NORMAL" } },
        images: { create: { url: getPlaceholderAvatarImageURL(username) } },
        // profiles: {
        //   create: {
        //     modeName: `Default ${name}`,
        //     headline: `The headline of ${name}`,
        //     bio: `The bio of ${name} for longer description.`,
        //   },
        // },
      },
    })
  },

  login({ email }: Pick<User, "email">) {
    // The logic is in Conform Zod validation
    return prisma.user.findUnique({ where: { email } })
  },

  continueWithService({
    email,
    fullname,
    username,
    imageUrl,
  }: Pick<User, "email" | "fullname" | "username"> & { imageUrl: string }) {
    return prisma.user.create({
      data: {
        email,
        fullname,
        username,
        images: { create: { url: imageUrl } },
      },
      select: { id: true },
    })
  },

  continueAttachImage({
    id,
    imageUrl,
  }: Pick<User, "id"> & { imageUrl: string }) {
    return prisma.user.update({
      where: { id },
      data: { images: { create: { url: imageUrl } } },
    })
  },

  deleteById({ id }: Pick<User, "id">) {
    return prisma.user.delete({ where: { id } })
  },

  deleteByEmail({ email }: Pick<User, "email">) {
    if (!email) return { error: { email: `Email is required` } }
    return prisma.user.delete({ where: { email } })
  },

  async updateUsername({
    id,
    username,
  }: z.infer<typeof schemaUserUpdateUsername>) {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: { username },
      })
      return { user, error: null }
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return { error: { username: `Username ${username} is taken` } }
      }
      return { error: { username: "Username failed to update" } }
    }
  },

  async updateName({ id, fullname }: z.infer<typeof schemaUserUpdateFullName>) {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: { fullname },
      })
      return { user, error: null }
    } catch (error) {
      return { error: { fullname: `Full Name is failed to change` } }
    }
  },

  async updateNick({ id, nickname }: z.infer<typeof schemaUserUpdateNickName>) {
    try {
      const user = await prisma.user.update({
        where: { id },
        data: { nickname },
      })
      return { user, error: null }
    } catch (error) {
      return { error: { nickname: `Nick is failed to change` } }
    }
  },

  async updateEmail({ id, email }: z.infer<typeof schemaUserUpdateEmail>) {
    try {
      const user = await prisma.user.update({ where: { id }, data: { email } })
      return { user, error: null }
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return { error: { email: `Email ${email} might already used` } }
      }
      return { error: { username: "Email failed to update" } }
    }
  },
}
