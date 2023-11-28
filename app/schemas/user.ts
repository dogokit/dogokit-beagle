import { z } from "zod"

import { id, redirectTo } from "~/schemas/general"

const email = z
  .string({ required_error: "Email is required" })
  .min(1)
  .email("This is not an email")

const username = z
  .string({ required_error: "Username is required" })
  .regex(/^[a-zA-Z0-9_]+$/, "Only alphabet, number, underscore allowed")
  .min(4, "Username require at least 4 characters")
  .max(20, "Username limited to 20 characters")

const fullname = z
  .string({ required_error: "Full name is required" })
  .min(1)
  .max(50, "Full name limited to 50 characters")

const nickname = z.string().max(50, "Nick name limited to 50 characters")

/**
 * Potential improvement:
 * - Shouldn't match the email
 * - Not only numbers
 */
const password = z
  .string({ required_error: "Password is required" })
  .min(8, "Password at least 8 characters")
  .max(100, "Password max of 100 characters")
const confirmPassword = z.string()
const currentPassword = z
  .string({ required_error: "Current password is required" })
  .min(1)

const remember = z.boolean().optional()

const roleSymbol = z.string().min(1, "Role is required")

const tag = z.object({ id, symbol: z.string().optional() })

const tags = z.array(tag).optional()

const modeName = z.string().min(1, "Profile mode name is required")

const headline = z.string().max(50, "Headline limited to 50 characters")

const bio = z.string().max(1000, "Bio limited to 1000 characters").optional()

const link = z.object({
  url: z.string().url({ message: "Please enter a valid URL." }),
  text: z.string().optional(),
})
const links = z.array(link).optional()

export const schemaLink = link
export const schemaLinks = links

export const schemaUserSignUp = z.object({
  fullname,
  username,
  email,
  password,
  remember,
})

export const schemaUserLogIn = z.object({
  email,
  password,
  remember,
  redirectTo,
})

export const schemaUserUsername = z.object({ id, username })
export const schemaUserFullName = z.object({ id, fullname })
export const schemaUserNickName = z.object({ id, nickname })
export const schemaUserEmail = z.object({ id, email })

export const schemaUserProfileModeName = z.object({ id, modeName })
export const schemaUserProfileHeadline = z.object({ id, headline })
export const schemaUserProfileBio = z.object({ id, bio })
export const schemaUserProfileLinks = z.object({ id, links })

export const schemaUserPassword = z
  .object({
    id,
    currentPassword,
    password,
    confirmPassword,
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "The passwords did not match",
      })
    }
  })

export const schemaUserUpdateTags = z.object({
  id,
  tags,
})

export const schemaRootUserUpdate = z.object({
  id,
  email,
  username,
  fullname,
  nickname,
  links,
  roleSymbol,
})

export const issueUsernameUnallowed = {
  path: ["username"],
  code: z.ZodIssueCode.custom,
  message: "Username is not allowed, please change",
}
