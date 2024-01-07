import { IconSet } from "~/components/libs/icon-set"

export type NavItem = {
  path: string
  text: string
  icon: string
  iconEl?: React.ReactNode
  end?: boolean
  shortcut?: string
  isEnabled?: boolean
}

export const configNavigationItems: NavItem[] = [
  {
    path: "/",
    text: "Home",
    icon: "ph:house-duotone",
    iconEl: <IconSet.House weight="duotone" />,
    isEnabled: false,
  },
  {
    path: "/about",
    text: "About",
    icon: "ph:info-duotone",
    iconEl: <IconSet.Info weight="duotone" />,
    isEnabled: true,
  },
  {
    path: "/search",
    text: "Search",
    icon: "ph:magnifying-glass-duotone",
    iconEl: <IconSet.MagnifyingGlass weight="duotone" />,
    isEnabled: true,
  },
  {
    path: "/posts",
    text: "Posts",
    icon: "ph:scroll-duotone",
    iconEl: <IconSet.Scroll weight="duotone" />,
    isEnabled: true,
  },
  {
    path: "/users",
    text: "Users",
    icon: "ph:users-four-duotone",
    iconEl: <IconSet.UsersFour weight="duotone" />,
    isEnabled: true,
  },
  {
    path: "/user/dashboard",
    icon: "ph:binoculars-duotone",
    text: "Dashboard",
    iconEl: <IconSet.Binoculars weight="duotone" />,
    shortcut: "⌘K+D",
  },
  {
    path: "/user/posts",
    icon: "ph:scroll-duotone",
    text: "Posts",
    iconEl: <IconSet.Scroll weight="duotone" />,
    shortcut: "⌘K+P",
  },
  {
    path: "/user/settings",
    icon: "ph:gear-duotone",
    text: "Settings",
    iconEl: <IconSet.Gear weight="duotone" />,
    shortcut: "⌘K+S",
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
    path: "/user/account",
    icon: "ph:user-duotone",
    text: "Account",
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
    icon: "ph:crown-simple-duotone",
    text: "Admin",
  },
  {
    path: "/admin/dashboard",
    icon: "ph:crown-simple-duotone",
    text: "Admin Dashboard",
  },
  {
    path: "/admin/pages",
    icon: "ph:rectangle-duotone",
    text: "Pages",
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
    path: "/owner",
    icon: "ph:crown-duotone",
    text: "Owner",
  },
  {
    path: "/owner/dashboard",
    icon: "ph:crown-duotone",
    text: "Owner Dashboard",
  },
  {
    path: "/owner/users",
    icon: "ph:users-four-duotone",
    iconEl: <IconSet.UsersFour weight="duotone" />,
    text: "Users",
  },
  {
    path: "/examples",
    icon: "ph:bounding-box-duotone",
    iconEl: <IconSet.BoundingBox weight="duotone" />,
    text: "Examples",
    isEnabled: true,
  },
  {
    path: "/blank",
    icon: "ph:square",
    iconEl: <IconSet.Square weight="duotone" />,
    text: "Blank",
  },
  {
    path: "/signup",
    icon: "ph:user-plus-duotone",
    iconEl: <IconSet.UserPlus weight="duotone" />,
    text: "Log In",
  },
  {
    path: "/login",
    icon: "ph:sign-in-duotone",
    iconEl: <IconSet.SignIn weight="duotone" />,
    text: "Log In",
  },
  {
    path: "/logout",
    icon: "ph:sign-out-duotone",
    iconEl: <IconSet.SignOut weight="duotone" />,
    text: "Log Out",
  },
]
