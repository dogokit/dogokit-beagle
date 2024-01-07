import { type User } from "@prisma/client"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { cn } from "~/utils/cn"
import { getPlaceholderAvatarUrl } from "~/utils/placeholder"
import { getNameInitials } from "~/utils/string"

export const avatarAutoVariants = cva("", {
  variants: {
    size: {
      xs: "size-6",
      sm: "size-8",
      default: "size-12",
      lg: "size-20",
      xl: "size-28",
    },
  },
  compoundVariants: [
    { size: "xs", class: "text-base" },
    { size: "sm", class: "text-lg" },
    { size: "default", class: "text-3xl" },
    { size: "lg", class: "text-4xl" },
    { size: "xl", class: "text-5xl" },
  ],
  defaultVariants: {
    size: "default",
  },
})

interface AvatarAutoProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarAutoVariants> {
  user: Pick<User, "username" | "fullname">
  imageUrl?: string
}

/**
 * Image URL is flexible enough to be sourced from any source:
 * - placeholder function
 * - user.images[0]?.url
 */
export function AvatarAuto({ user, imageUrl, size, ...props }: AvatarAutoProps) {
  return (
    <Avatar {...props} className={cn(avatarAutoVariants({ size }), "bg-secondary")}>
      <AvatarImage src={imageUrl || getPlaceholderAvatarUrl(user.username)} alt={user.fullname} />

      {!imageUrl && <AvatarFallback>{getNameInitials(user.fullname)}</AvatarFallback>}
    </Avatar>
  )
}
