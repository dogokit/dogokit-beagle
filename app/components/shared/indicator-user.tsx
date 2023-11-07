import { Link, NavLink } from "@remix-run/react"
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
import { useAppMode } from "~/hooks/use-app-mode"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { AvatarAuto } from "../ui/avatar"
import { Button } from "../ui/button"
import { Iconify } from "../ui/iconify"

export function IndicatorUser({
  align = "end",
}: {
  align?: "center" | "start" | "end" | undefined
}) {
  const { userData } = useRootLoaderData()
  const { isModeDevelopment } = useAppMode()

  if (!userData) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <AvatarAuto user={userData} imageURL={userData.images[0]?.url} />
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

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <NavLink to={`/${userData.username}`}>
              <Iconify icon="ph:user-duotone" />
              <span>Profile</span>
            </NavLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <NavLink to={`/user/dashboard`}>
              <Iconify icon="ph:binoculars-duotone" />
              <span>Dashboard</span>
            </NavLink>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <NavLink to={`/user/settings`}>
              <Iconify icon="ph:gear-duotone" />
              <span>Settings</span>
            </NavLink>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Iconify icon="ph:credit-card-duotone" />
            <span>Billing</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Iconify icon="ph:notification-duotone" />
            <span>Notifications</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Iconify icon="ph:keyboard-duotone" />
            <span>Command Palette</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {isModeDevelopment && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <NavLink to={`/admin`}>
                  <Iconify icon="ph:crown-duotone" />
                  <span>Admin</span>
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <NavLink to={`/components`}>
                  <Iconify icon="ph:bounding-box-duotone" />
                  <span>Components</span>
                </NavLink>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <NavLink to="/logout">
            <Iconify icon="ph:sign-out-duotone" />
            <span>Log out</span>
          </NavLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
