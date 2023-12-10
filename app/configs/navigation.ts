export type NavItem = {
  path: string
  text: string
  icon: string
  end?: boolean
  shortcut?: string
  isEnabled?: boolean
}

export const configNavigationItems: NavItem[] = [
  {
    path: "/",
    text: "Home",
    icon: "ph:house-duotone",
    isEnabled: false,
  },
  {
    path: "/about",
    text: "About",
    icon: "ph:info-duotone",
    isEnabled: true,
  },
  {
    path: "/search",
    text: "Search",
    icon: "ph:magnifying-glass-duotone",
    isEnabled: true,
  },
  {
    path: "/posts",
    text: "Posts",
    icon: "ph:scroll-duotone",
    isEnabled: true,
  },
  {
    path: "/users",
    text: "Users",
    icon: "ph:users-four-duotone",
    isEnabled: true,
  },
  {
    path: "/user/dashboard",
    icon: "ph:binoculars-duotone",
    text: "Dashboard",
    shortcut: "⌘K+D",
  },
  {
    path: "/user/posts",
    icon: "ph:scroll-duotone",
    text: "Posts",
    shortcut: "⌘K+P",
  },
  {
    path: "/user/settings",
    icon: "ph:gear-duotone",
    text: "Settings",
    shortcut: "⌘K+S",
  },
  {
    path: "/user/account",
    icon: "ph:user-duotone",
    text: "Account",
  },
  {
    path: "/user/billing",
    icon: "ph:credit-card-duotone",
    text: "Billing",
    shortcut: "⌘K+B",
  },
  {
    path: "/user/notifications",
    icon: "ph:notification-duotone",
    text: "Notifications",
    shortcut: "⌘K+N",
  },
  {
    path: "/help",
    icon: "ph:question-duotone",
    text: "Help",
    shortcut: "⌘K+H",
  },
  {
    path: "/help/shortcuts",
    icon: "ph:keyboard-duotone",
    text: "Command Palette",
    shortcut: "⌘K",
  },
  {
    path: "/user",
    icon: "ph:user-duotone",
    text: "User",
  },
  {
    path: "/admin",
    icon: "ph:crown-duotone",
    text: "Admin",
  },
  {
    path: "/admin/dashboard",
    icon: "ph:crown-duotone",
    text: "Dashboard",
  },
  {
    path: "/admin/users",
    icon: "ph:users-four-duotone",
    text: "Users",
  },
  {
    path: "/admin/posts",
    icon: "ph:scroll-duotone",
    text: "Posts",
  },
  {
    path: "/admin/settings",
    icon: "ph:gear-duotone",
    text: "Settings",
  },
  {
    path: "/admin/notifications",
    icon: "ph:notification-duotone",
    text: "Notifications",
  },
  {
    path: "/examples",
    icon: "ph:bounding-box-duotone",
    text: "Examples",
    isEnabled: true,
  },
  {
    path: "/blank",
    icon: "ph:square",
    text: "Blank",
  },
  {
    path: "/logout",
    icon: "ph:sign-out-duotone",
    text: "Log Out",
  },
]
