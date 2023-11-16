export type ConfigNewItem = {
  action: string
  icon: string
  name: string
  isEnabled: boolean
}

/**
 * EDITME: Config New Items
 */
export const configNewItems: ConfigNewItem[] = [
  {
    action: "/user/posts/new",
    name: "Post",
    icon: "ph:scroll-duotone",
    isEnabled: true,
  },
  {
    action: "/user/tags/new",
    name: "Tag",
    icon: "ph:tag-duotone",
    isEnabled: false,
  },
  {
    action: "/user/categories/new",
    name: "Tag",
    icon: "ph:tag-duotone",
    isEnabled: false,
  },
  {
    action: "/user/images/new",
    name: "Image",
    icon: "ph:image-duotone",
    isEnabled: false,
  },
  {
    action: "/admin/users/new",
    name: "User",
    icon: "ph:user-duotone",
    isEnabled: false,
  },
]
