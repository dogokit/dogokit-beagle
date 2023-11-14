export type NavItem = {
  to: string
  icon: string
  text: string
  shortcut?: string
  isEnabled?: boolean
}

export const configNavigationItems: NavItem[] = [
  { to: "/", text: "Home", icon: "ph:house-duotone", isEnabled: false },
  { to: "/about", text: "About", icon: "ph:info-duotone", isEnabled: true },
  { to: "/posts", text: "Posts", icon: "ph:scroll-duotone", isEnabled: true },
  {
    to: "/user/dashboard",
    icon: "ph:binoculars-duotone",
    text: "Dashboard",
    shortcut: "⌘K+D",
  },
  {
    to: "/user/posts",
    icon: "ph:scroll-duotone",
    text: "Posts",
    shortcut: "⌘K+P",
  },
  {
    to: "/user/settings",
    icon: "ph:gear-duotone",
    text: "Settings",
    shortcut: "⌘K+S",
  },
  {
    to: "/user/account",
    icon: "ph:user-duotone",
    text: "Account",
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
    to: "/help",
    icon: "ph:question-duotone",
    text: "Help",
    shortcut: "⌘K+H",
  },
  {
    to: "/help/shortcuts",
    icon: "ph:keyboard-duotone",
    text: "Command Palette",
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
    icon: "ph:binoculars-duotone",
    text: "Dashboard",
  },
  {
    to: "/admin/posts",
    icon: "ph:scroll-duotone",
    text: "Posts",
  },
  {
    to: "/admin/settings",
    icon: "ph:gear-duotone",
    text: "Settings",
  },
  {
    to: "/admin/notifications",
    icon: "ph:notification-duotone",
    text: "Notifications",
  },
  {
    to: "/components",
    icon: "ph:bounding-box-duotone",
    text: "Components",
  },
  {
    to: "/logout",
    icon: "ph:sign-out-duotone",
    text: "Log Out",
  },
]
