import { NavLink } from "@remix-run/react"
import { Iconify } from "~/components/ui/iconify"
import { type NavItem } from "~/configs/navigation"

import { cn } from "~/utils/cn"

export function SidebarNavItems({ items }: { items: NavItem[] }) {
  return (
    <ul className="space-y-1">
      {items.map(item => {
        const isLogout = item.to === "/logout"
        return (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                cn(
                  "flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold transition",
                  !isLogout && "hover:bg-secondary",
                  !isLogout && isActive && "bg-secondary text-primary",
                  isLogout &&
                    "hover:bg-destructive hover:text-destructive-foreground",
                )
              }
            >
              <Iconify icon={item.icon} className="shrink-0" />
              <span>{item.text}</span>
            </NavLink>
          </li>
        )
      })}
    </ul>
  )
}
