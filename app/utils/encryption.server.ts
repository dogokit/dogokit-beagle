import bcrypt from "bcryptjs"

export function hashPassword(password: string) {
  return bcrypt.hash(password, 10)
}

export function checkPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash)
}
