import { NavLink } from "@remix-run/react"

import { IconMatch } from "~/components/libs/icon"
import { type NavItem } from "~/configs/navigation"
import { cn } from "~/utils/cn"

export function SidebarNavItems({ items }: { items: NavItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map(item => {
        const isLogout = item.path === "/logout"
        return (
          <li key={item.path}>
            <NavLink
              to={item.path}
              prefetch="intent"
              className={({ isActive }) =>
                cn(
                  "focus-ring flex w-full items-center gap-2 rounded-md px-2 py-1 transition",
                  !isLogout && !isActive && "hover:bg-secondary",
                  !isLogout && isActive && "bg-secondary text-secondary-foreground",
                  isLogout && "hover:bg-destructive hover:text-destructive-foreground",
                )
              }
            >
              <IconMatch icon={item.icon} className="shrink-0" />
              <span className="hidden whitespace-nowrap sm:inline">{item.text}</span>
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
