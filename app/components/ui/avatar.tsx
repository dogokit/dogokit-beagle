import * as AvatarPrimitive from "@radix-ui/react-avatar"
import * as React from "react"

import { type UserData } from "~/services/auth.server"
import { cn } from "~/utils/cn"
import { formatNameInitials } from "~/utils/format-string"
import { getPlaceholderAvatarImageURL } from "~/utils/placeholder"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-8 w-8 shrink-0 select-none overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

/**
 * Avatar Auto
 *
 * Can refactor later with variant to handle size
 */
function AvatarAuto({
  user,
  imageURL,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  user: Pick<UserData, "username" | "fullname">
  imageURL?: string
}) {
  return (
    <Avatar {...props}>
      <AvatarImage
        src={imageURL || getPlaceholderAvatarImageURL(user.username)}
        alt={user.fullname}
      />

      {!imageURL && (
        <AvatarFallback>{formatNameInitials(user.fullname)}</AvatarFallback>
      )}
    </Avatar>
  )
}

export { Avatar, AvatarAuto, AvatarFallback, AvatarImage }
