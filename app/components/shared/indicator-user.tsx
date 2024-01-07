import { Link, NavLink } from "@remix-run/react"
import { type VariantProps } from "class-variance-authority"

import { IconMatch } from "~/components/libs/icon"
import { AvatarAuto, type avatarAutoVariants } from "~/components/ui/avatar-auto"
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
import { configNavigationItems, type NavItem } from "~/configs/navigation"
import { useAppMode } from "~/hooks/use-app-mode"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"

interface IndicatorUserProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof avatarAutoVariants> {
  align?: "center" | "start" | "end" | undefined
}

export function IndicatorUser({ align = "end", size }: IndicatorUserProps) {
  const { userData } = useRootLoaderData()
  const { isModeDevelopment } = useAppMode()

  if (!userData) return null

  /**
   * Configured as a function to be near with the other navItems
   */
  const profileNavItem = (username: string) => [
    {
      text: "Profile",
      path: `/${username}`,
      icon: "user",
      shortcut: "⌘K+P",
    },
  ]

  /**
   * Configure the available paths in app/configs/navigation.ts
   */

  const userNavItems = ["/user/dashboard", "/user/posts", "/user/settings", "/user/notifications"]

  const devNavItems = ["/admin", "/blank"]

  const authNavItems = ["/logout"]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-ring rounded-full">
        <AvatarAuto user={userData} imageUrl={userData.images[0]?.url} size={size} />
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align} className="w-56 overflow-scroll">
        <DropdownMenuLabel>
          <p className="text-base font-semibold">{userData.fullname}</p>
          <p className="text-sm font-semibold text-muted-foreground">
            <Link to={`/${userData.username}`} prefetch="intent">
              @{userData.username}
            </Link>
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />
        <DropdownMenuGroupItems
          items={[
            ...profileNavItem(userData.username),
            ...configNavigationItems.filter(item => userNavItems.includes(item.path)),
          ]}
        />

        {isModeDevelopment && <DropdownMenuSeparator />}
        {isModeDevelopment && (
          <DropdownMenuGroupItems
            items={configNavigationItems.filter(item => devNavItems.includes(item.path))}
          />
        )}

        <DropdownMenuSeparator />
        <DropdownMenuGroupItems
          items={configNavigationItems.filter(item => authNavItems.includes(item.path))}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * More than just navigation items, can be actions as well
 */
function DropdownMenuGroupItems({ items }: { items: NavItem[] }) {
  return (
    <DropdownMenuGroup>
      {items.map(item => {
        const isLogout = item.path === "/logout"
        return (
          <DropdownMenuItem key={item.path} isDestructive={isLogout} asChild>
            <NavLink to={item.path} prefetch="intent">
              <IconMatch icon={item.icon} className="me-2" />
              <span>{item.text}</span>
              {item.shortcut && <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>}
            </NavLink>
          </DropdownMenuItem>
        )
      })}
    </DropdownMenuGroup>
  )
}
