import { Prisma, type Connection, type User } from "@prisma/client"
import { type z } from "zod"

import { prisma } from "~/libs/db.server"
import {
  type schemaUserUpdateEmail,
  type schemaUserUpdateFullName,
  type schemaUserUpdateNickName,
  type schemaUserUpdateUsername,
} from "~/schemas/user"
import { hashPassword } from "~/utils/encryption.server"
import { getPlaceholderAvatarUrl } from "~/utils/placeholder"
import { createNanoIdShort } from "~/utils/string"
import { debugCode } from "~/utils/string.server"

export const modelUser = {
  count() {
    return prisma.user.count()
  },

  getAll() {
    return prisma.user.findMany({
      include: {
        images: { select: { url: true } },
      },
    })
  },

  getWithImages() {
    return prisma.user.findFirst({
      include: {
        images: { select: { url: true } },
      },
    })
  },

  getAllUsernames() {
    return prisma.user.findMany({
      select: {
        username: true,
        updatedAt: true,
      },
      orderBy: {
        username: "asc",
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
        nickname: true,
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

  login({ email }: Pick<User, "email">) {
    // The logic is in Conform Zod validation
    return prisma.user.findUnique({ where: { email } })
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
        roles: { connect: { symbol: "NORMAL" } },
        password: { create: { hash: await hashPassword(password) } },
        images: { create: { url: getPlaceholderAvatarUrl(username) } },
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

  async continueWithService({
    email,
    fullname,
    username,
    providerName,
    providerId,
    imageUrl,
  }: Pick<User, "email" | "fullname" | "username"> &
    Pick<Connection, "providerName" | "providerId"> & { imageUrl: string }) {
    debugCode({ fullname, username, imageUrl, providerName, providerId }, false)

    const existingUsername = await modelUser.getByUsername({ username })

    try {
      return prisma.user.upsert({
        where: { email },
        create: {
          email,
          fullname,
          roles: { connect: { symbol: "NORMAL" } },
          username: existingUsername
            ? `${username}_${createNanoIdShort()}`
            : username,
          images: {
            create: { url: imageUrl || getPlaceholderAvatarUrl(username) },
          },
          connections: {
            connectOrCreate: {
              where: { providerId_providerName: { providerName, providerId } },
              create: { providerName, providerId },
            },
          },
        },
        update: {
          images: {
            create: { url: imageUrl || getPlaceholderAvatarUrl(username) },
          },
          connections: {
            connectOrCreate: {
              where: { providerId_providerName: { providerName, providerId } },
              create: { providerName, providerId },
            },
          },
        },
        select: { id: true },
      })
    } catch (error) {
      console.error(error)
      return null
    }
  },

  continueAttachImage({
    id,
    imageUrl,
  }: Pick<User, "id"> & { imageUrl: string }) {
    return prisma.user.update({
      where: { id },
      data: {
        images: { create: { url: imageUrl } },
        connections: {},
      },
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
