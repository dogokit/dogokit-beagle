export type NavItem = {
  to: string
  icon: string
  text: string
  shortcut?: string
}

export const configNavigationItems: NavItem[] = [
  {
    text: "Dashboard",
    to: "/user/dashboard",
    icon: "ph:binoculars-duotone",
    shortcut: "⌘K+D",
  },
  {
    text: "Settings",
    to: "/user/settings",
    icon: "ph:gear-duotone",
    shortcut: "⌘K+S",
  },
  {
    to: "/user/account",
    text: "Account",
    icon: "ph:user-duotone",
  },
  {
    text: "Billing",
    to: "/user/billing",
    icon: "ph:credit-card-duotone",
    shortcut: "⌘K+B",
  },
  {
    text: "Notifications",
    to: "/user/notifications",
    icon: "ph:notification-duotone",
    shortcut: "⌘K+N",
  },
  {
    text: "Command Palette",
    to: "/help/shortcuts",
    icon: "ph:keyboard-duotone",
    shortcut: "⌘K",
  },
  {
    to: "/user",
    icon: "ph:user-duotone",
    text: "User",
  },
  {
    to: "/admin",
    icon: "ph:crown-duotone",
    text: "Admin",
  },
  {
    to: "/admin/dashboard",
    icon: "ph:crown-duotone",
    text: "Admin Dashboard",
  },
  {
    to: "/admin/settings",
    icon: "ph:crown-duotone",
    text: "Admin Settings",
  },
  {
    to: "/admin/notifications",
    icon: "ph:crown-duotone",
    text: "Admin Notifications",
  },
  {
    to: "/components",
    icon: "ph:bounding-box-duotone",
    text: "Components",
  },
  {
    to: "/logout",
    text: "Log Out",
    icon: "ph:sign-out-duotone",
  },
]
