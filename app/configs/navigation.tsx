import { IconSet } from "~/components/libs/icon"

export type NavItem = {
  isEnabled?: boolean
  path: string
  text: string
  icon: string
  iconEl?: React.ReactNode
  end?: boolean
  shortcut?: string
}

export const configNavigationItems: NavItem[] = [
  {
    isEnabled: false,
    path: "/",
    text: "Home",
    icon: "ph:house-duotone",
    iconEl: <IconSet.House weight="duotone" />,
  },
  {
    isEnabled: true,
    path: "/about",
    text: "About",
    icon: "ph:info-duotone",
    iconEl: <IconSet.Info weight="duotone" />,
  },
  {
    isEnabled: true,
    path: "/search",
    text: "Search",
    icon: "ph:magnifying-glass-duotone",
    iconEl: <IconSet.MagnifyingGlass weight="duotone" />,
  },
  {
    isEnabled: true,
    path: "/posts",
    text: "Posts",
    icon: "ph:scroll-duotone",
    iconEl: <IconSet.Scroll weight="duotone" />,
  },
  {
    isEnabled: true,
    path: "/users",
    text: "Users",
    icon: "ph:users-four-duotone",
    iconEl: <IconSet.UsersFour weight="duotone" />,
  },
  {
    path: "/user/dashboard",
    text: "Dashboard",
    icon: "ph:binoculars-duotone",
    iconEl: <IconSet.Binoculars weight="duotone" />,
    shortcut: "⌘K+D",
  },
  {
    path: "/user/posts",
    text: "Posts",
    icon: "ph:scroll-duotone",
    iconEl: <IconSet.Scroll weight="duotone" />,
    shortcut: "⌘K+P",
  },
  {
    path: "/user/settings",
    text: "Settings",
    icon: "ph:gear-duotone",
    iconEl: <IconSet.Gear weight="duotone" />,
    shortcut: "⌘K+S",
  },
  {
    path: "/user/billing",
    text: "Billing",
    icon: "ph:credit-card-duotone",
    iconEl: <IconSet.Gear weight="duotone" />,
    shortcut: "⌘K+B",
  },
  {
    path: "/user/notifications",
    text: "Notifications",
    icon: "ph:notification-duotone",
    iconEl: <IconSet.Notification weight="duotone" />,
    shortcut: "⌘K+N",
  },
  {
    path: "/user/account",
    text: "Account",
    icon: "ph:user-duotone",
    iconEl: <IconSet.User weight="duotone" />,
  },
  {
    path: "/help",
    text: "Help",
    icon: "ph:question-duotone",
    iconEl: <IconSet.Question weight="duotone" />,
    shortcut: "⌘K+H",
  },
  {
    path: "/help/shortcuts",
    text: "Command Palette",
    icon: "ph:keyboard-duotone",
    iconEl: <IconSet.Keyboard weight="duotone" />,
    shortcut: "⌘K",
  },
  {
    path: "/user",
    text: "User",
    icon: "ph:user-duotone",
    iconEl: <IconSet.User weight="duotone" />,
  },
  {
    path: "/admin",
    text: "Admin",
    icon: "ph:crown-simple-duotone",
    iconEl: <IconSet.CrownSimple weight="duotone" />,
  },
  {
    path: "/admin/dashboard",
    text: "Admin Dashboard",
    icon: "ph:crown-simple-duotone",
    iconEl: <IconSet.CrownSimple weight="duotone" />,
  },
  {
    path: "/admin/pages",
    text: "Pages",
    icon: "ph:rectangle-duotone",
    iconEl: <IconSet.Rectangle weight="duotone" />,
  },
  {
    path: "/admin/users",
    text: "Users",
    icon: "ph:users-four-duotone",
    iconEl: <IconSet.UsersFour weight="duotone" />,
  },
  {
    path: "/admin/posts",
    text: "Posts",
    icon: "ph:scroll-duotone",
    iconEl: <IconSet.Scroll weight="duotone" />,
  },
  {
    path: "/admin/settings",
    text: "Settings",
    icon: "ph:gear-duotone",
    iconEl: <IconSet.Gear weight="duotone" />,
  },
  {
    path: "/admin/notifications",
    text: "Notifications",
    icon: "ph:notification-duotone",
    iconEl: <IconSet.Notification weight="duotone" />,
  },
  {
    path: "/owner",
    text: "Owner",
    icon: "ph:crown-duotone",
    iconEl: <IconSet.Crown weight="duotone" />,
  },
  {
    path: "/owner/dashboard",
    text: "Owner Dashboard",
    icon: "ph:crown-duotone",
    iconEl: <IconSet.Crown weight="duotone" />,
  },
  {
    path: "/owner/users",
    text: "Users",
    icon: "ph:users-four-duotone",
    iconEl: <IconSet.UsersFour weight="duotone" />,
  },
  {
    path: "/examples",
    text: "Examples",
    icon: "ph:bounding-box-duotone",
    iconEl: <IconSet.BoundingBox weight="duotone" />,
    isEnabled: true,
  },
  {
    path: "/blank",
    text: "Blank",
    icon: "ph:square",
    iconEl: <IconSet.Square weight="duotone" />,
  },
  {
    path: "/signup",
    text: "Log In",
    icon: "ph:user-plus-duotone",
    iconEl: <IconSet.UserPlus weight="duotone" />,
  },
  {
    path: "/login",
    text: "Log In",
    icon: "ph:sign-in-duotone",
    iconEl: <IconSet.SignIn weight="duotone" />,
  },
  {
    path: "/logout",
    text: "Log Out",
    icon: "ph:sign-out-duotone",
    iconEl: <IconSet.SignOut weight="duotone" />,
  },
]
