export type ConfigNewItem = {
  action: string
  icon: string
  name: string
  isEnabled: boolean
}

export const configNewItems: ConfigNewItem[] = [
  {
    action: "/user/posts/new",
    name: "Post",
    icon: "ph:scroll-duotone",
    isEnabled: true,
  },
  {
    action: "/new",
    name: "Tag",
    icon: "ph:tag-duotone",
    isEnabled: false,
  },
  {
    action: "/new",
    name: "Image",
    icon: "ph:image-duotone",
    isEnabled: false,
  },
  {
    action: "/new",
    name: "User",
    icon: "ph:user-duotone",
    isEnabled: false,
  },
]
