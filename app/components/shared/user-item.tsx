import { type Prisma } from "@prisma/client"
import { Link } from "@remix-run/react"

import { type modelUser } from "~/models/user.server"
import { AvatarAuto } from "../ui/avatar-auto"

export function UserItem({
  user,
}: {
  user: Prisma.PromiseReturnType<typeof modelUser.getWithImages>
}) {
  if (!user) return null
  return (
    <div className="space-y-1 py-2">
      <AvatarAuto user={user} imageUrl={user.images[0]?.url} />
      <div>
        <h4>{user.fullname}</h4>
        <p className="text-muted-foreground">@{user.username}</p>
      </div>
    </div>
  )
}

export function UserItemLink({
  user,
}: {
  user: Prisma.PromiseReturnType<typeof modelUser.getWithImages>
}) {
  if (!user) return null
  return (
    <li>
      <Link
        to={`/${user.username}`}
        className="block space-y-1 transition hover:opacity-75"
      >
        <UserItem user={user} />
      </Link>
    </li>
  )
}
