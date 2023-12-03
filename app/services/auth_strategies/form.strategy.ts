// Refer to https://github.com/sergiodxa/remix-auth-form for more information
import { AuthorizationError } from "remix-auth"
import { FormStrategy } from "remix-auth-form"

import { prisma } from "~/libs/db.server"
import { type UserSession } from "~/services/auth.server"

export const formStrategy = new FormStrategy<UserSession>(async ({ form }) => {
  const email = String(form.get("email"))

  /**
   * The user creation logic was created in the signup action
   * So this Form Stragegy could be used on signup and login
   * Just by finding the user by email
   */
  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true },
  })
  if (!user) throw new AuthorizationError("User email is not found")

  return { id: user.id }
})
