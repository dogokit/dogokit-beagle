import { Link, NavLink } from "@remix-run/react"
import { type VariantProps } from "class-variance-authority"

import { AvatarAuto, avatarAutoVariants } from "~/components/ui/avatar-auto"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Iconify } from "~/components/ui/iconify"
import { useAppMode } from "~/hooks/use-app-mode"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { cn } from "~/utils/cn"

export interface IndicatorUserProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof avatarAutoVariants> {
  align?: "center" | "start" | "end" | undefined
}

export function IndicatorUser({ align = "end", size }: IndicatorUserProps) {
  const { userData } = useRootLoaderData()
  const { isModeDevelopment } = useAppMode()

  if (!userData) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn("relative rounded-full", avatarAutoVariants({ size }))}
        >
          <AvatarAuto
            user={userData}
            imageURL={userData.images[0]?.url}
            size={size}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="w-56 overflow-scroll">
        <DropdownMenuLabel>
          <h4>{userData.fullname}</h4>
          <h5>
            <Link to={`/${userData.username}`}>@{userData.username}</Link>
          </h5>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroupItems
          items={createDropdownItemsPrimary(userData.username)}
        />

        <DropdownMenuSeparator />
        {isModeDevelopment && (
          <DropdownMenuGroupItems items={createDropdownItemsDev()} />
        )}

        <DropdownMenuSeparator />
        <DropdownMenuGroupItems items={createDropdownItemsAuth()} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function DropdownMenuGroupItems({ items }: { items: DropdownMenuItem[] }) {
  return (
    <DropdownMenuGroup>
      {items.map(item => (
        <DropdownMenuItem key={item.to} asChild>
          <NavLink to={item.to} className="cursor-pointer">
            <Iconify icon={item.icon} className="me-2" />
            <span>{item.text}</span>
            {item.shortcut && (
              <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
            )}
          </NavLink>
        </DropdownMenuItem>
      ))}
    </DropdownMenuGroup>
  )
}

type DropdownMenuItem = {
  to: string
  icon: string
  text: string
  shortcut?: string
}

function createDropdownItemsPrimary(username: string) {
  return [
    {
      to: `/${username}`,
      icon: "ph:user-duotone",
      text: "Profile",
      shortcut: "⌘K+P",
    },
    {
      to: "/user/dashboard",
      icon: "ph:binoculars-duotone",
      text: "Dashboard",
      shortcut: "⌘K+D",
    },
    {
      to: "/user/settings",
      icon: "ph:gear-duotone",
      text: "Settings",
      shortcut: "⌘K+S",
    },
    {
      to: "/user/billing",
      icon: "ph:credit-card-duotone",
      text: "Billing",
      shortcut: "⌘K+B",
    },
    {
      to: "/user/notifications",
      icon: "ph:notification-duotone",
      text: "Notifications",
      shortcut: "⌘K+N",
    },
    {
      to: "/help/shortcuts",
      icon: "ph:keyboard-duotone",
      text: "Command Palette",
      shortcut: "⌘K",
    },
  ]
}

function createDropdownItemsDev() {
  return [
    {
      to: "/admin",
      icon: "ph:crown-duotone",
      text: "Admin",
    },
    {
      to: "/components",
      icon: "ph:bounding-box-duotone",
      text: "Components",
    },
  ]
}

function createDropdownItemsAuth() {
  return [
    {
      to: "/logout",
      icon: "ph:sign-out-duotone",
      text: "Log Out",
    },
  ]
}
