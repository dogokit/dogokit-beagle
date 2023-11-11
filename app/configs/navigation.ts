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
    to: "/user/account",
    text: "Account",
    icon: "ph:user-duotone",
  },
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
  {
    to: "/logout",
    text: "Log Out",
    icon: "ph:sign-out-duotone",
  },
]
