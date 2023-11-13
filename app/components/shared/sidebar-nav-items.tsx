import { NavLink } from "@remix-run/react"
import { Iconify } from "~/components/ui/iconify"
import { type NavItem } from "~/configs/navigation"

import { cn } from "~/utils/cn"

export function SidebarNavItems({ items }: { items: NavItem[] }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.to}>
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              cn(
                "flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold transition hover:bg-secondary",
                isActive && "text-primary",
              )
            }
          >
            <Iconify icon={item.icon} className="shrink-0" />
            <span>{item.text}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  )
}
