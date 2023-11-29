import { type User } from "@prisma/client"
import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { cn } from "~/utils/cn"
import { getPlaceholderAvatarUrl } from "~/utils/placeholder"
import { getNameInitials } from "~/utils/string"

export const avatarAutoVariants = cva("", {
  variants: {
    size: {
      xs: "h-5 w-5",
      sm: "h-8 w-8",
      default: "h-12 w-12",
      lg: "h-20 w-20",
      xl: "h-28 w-28",
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
export function AvatarAuto({
  user,
  imageUrl,
  size,
  ...props
}: AvatarAutoProps) {
  return (
    <Avatar {...props} className={cn(avatarAutoVariants({ size }))}>
      <AvatarImage
        src={imageUrl || getPlaceholderAvatarUrl(user.username)}
        alt={user.fullname}
      />

      {!imageUrl && (
        <AvatarFallback>{getNameInitials(user.fullname)}</AvatarFallback>
      )}
    </Avatar>
  )
}
