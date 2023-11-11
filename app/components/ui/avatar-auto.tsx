import * as React from "react"

import { cva, type VariantProps } from "class-variance-authority"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { type UserData } from "~/services/auth.server"
import { cn } from "~/utils/cn"
import { getPlaceholderAvatarImageURL } from "~/utils/placeholder"
import { getNameInitials } from "~/utils/string"

export const avatarAutoVariants = cva("", {
  variants: {
    size: {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      default: "h-10 w-10",
      lg: "h-20 w-20",
      xl: "h-28 w-28",
    },
  },
  compoundVariants: [
    { size: "xs", class: "text-base" },
    { size: "sm", class: "text-lg" },
    { size: "default", class: "text-2xl" },
    { size: "lg", class: "text-4xl" },
    { size: "xl", class: "text-5xl" },
  ],
  defaultVariants: {
    size: "default",
  },
})

export interface AvatarAutoProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof avatarAutoVariants> {
  user: Pick<UserData, "username" | "fullname">
  imageUrl?: string
}

export function AvatarAuto({
  user,
  imageUrl,
  size,
  ...props
}: AvatarAutoProps) {
  return (
    <Avatar {...props} className={cn(avatarAutoVariants({ size }))}>
      <AvatarImage
        src={imageUrl || getPlaceholderAvatarImageURL(user.username)}
        alt={user.fullname}
      />

      {!imageUrl && (
        <AvatarFallback>{getNameInitials(user.fullname)}</AvatarFallback>
      )}
    </Avatar>
  )
}
