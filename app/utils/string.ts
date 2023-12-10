import { customAlphabet } from "nanoid"
import pluralize from "pluralize"
import slugify from "slugify"

export function truncateText(
  text: string,
  charLimit: number = 30,
  withEllipsis: boolean = true,
) {
  if (!text || typeof text !== "string" || text.length <= charLimit) return text

  const trimmedLength = withEllipsis ? charLimit - 3 : charLimit
  const trimmedText = text.substring(0, trimmedLength).trim()

  return withEllipsis ? `${trimmedText}...` : trimmedText
}

export function createNanoId() {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 10)
  return nanoid()
}

export function createNanoIdShort() {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 3)
  return nanoid()
}

export function createSlug(text: string | undefined) {
  if (!text) return ""
  return slugify(text, { lower: true, strict: true })
}

export function pluralizeWord(word: string, count: number) {
  return pluralize(word, count, true)
}

export function stringifyCode(code: any) {
  return JSON.stringify(code, null, 2)
}

export function getNameInitials(name = "First Last") {
  return name
    .split(" ")
    .map((word, index) => {
      if (index < 2) return word.charAt(0).toUpperCase()
      else return ""
    })
    .join("")
}

export function getUsernameFromEmail(email: string) {
  // Step 1: Remove the domain part
  const atIndex = email.indexOf("@")

  if (atIndex !== -1) {
    // Step 2: Replace '.' with '_'
    return email.substring(0, atIndex).replace(/\./g, "_")
  } else {
    // Handle the case where the string doesn't contain '@'
    return email
  }
}
