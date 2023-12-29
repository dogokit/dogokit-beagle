import { json } from "@remix-run/node"

import { modelUser } from "~/models/user.server"

export async function loader() {
  const users = await modelUser.getAllUsernames()
  return json(users.map(user => user.username))
}
