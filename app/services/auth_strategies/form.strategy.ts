// Refer to https://github.com/sergiodxa/remix-auth-form for more information
import { FormStrategy } from "remix-auth-form"
import { type User } from "~/services/auth.server"

export const formStrategy = new FormStrategy<User>(
  async ({ form, context }) => {
    // Do something with the tokens and profile
    return {}
  },
)
