import { Link } from "@remix-run/react"

import { AvatarAuto } from "~/components/ui/avatar-auto"
import { type modelUser } from "~/models/user.server"
import { type JsonifyPrisma } from "~/types/jsonify"

export function UserItem({ user }: { user: JsonifyPrisma<typeof modelUser.getWithImages> }) {
  if (!user) return null

  return (
    <Link to={`/${user.username}`} className="block space-y-1 transition hover:opacity-75">
      <div className="space-y-1 py-2">
        <AvatarAuto user={user} imageUrl={user.images[0]?.url} />
        <div>
          <h5>{user.fullname}</h5>
          <p className="text-sm text-muted-foreground">@{user.username}</p>
        </div>
      </div>
    </Link>
  )
}
