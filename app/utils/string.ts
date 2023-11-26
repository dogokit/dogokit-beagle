import { customAlphabet } from "nanoid"
import pluralize from "pluralize"
import slugify from "slugify"
import util from "util"

export function debugCode(code: unknown, isShown = true) {
  // eslint-disable-next-line node/no-process-env
  if (process.env.NODE_ENV !== "development" || isShown !== true) return null
  console.info(util.inspect(code, false, null, true))
}

export function createNanoId() {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 10)
  return nanoid()
}

export function createNanoIdShort() {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 3)
  return nanoid()
}

export function createSlug(text: string) {
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

export function getTruncatedText(text: string, maxLength = 140) {
  if (!text || typeof text !== "string") return text
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text
}

export function getCapitalizedText(text: string) {
  if (!text || typeof text !== "string") return text
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * PROMPT: create typescript function to parse string
 * that if found word with the pattern of @text then it will
 * transform @text into an anchor element like <a href="/text">@text</a>
 */
export function formatParseTextMention(input: string) {
  const regex = /@(\w+)/g
  const output = input.replace(regex, '<a href="/$1">@$1</a>')
  return output

  // const input = "Hello @world! How are you doing today?";
  // const output = parseTextForMention(input);
  // Hello <a href="/world">@world</a>! How are you doing today?
}
