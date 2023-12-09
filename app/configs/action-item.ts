/**
 * EDITME: Config Action Items: New and Manage
 */

export type ConfigActionItem = {
  actionNew: string
  actionManage: string
  icon: string
  name: string
  isEnabled: boolean
}

export function getActionItem(name: string) {
  return configActionItems.find(actionItem => actionItem.name === name)
}

export const configActionItems: ConfigActionItem[] = [
  {
    actionNew: "/user/posts/new",
    actionManage: "/user/posts",
    name: "Post",
    icon: "ph:scroll-duotone",
    isEnabled: true,
  },
  {
    actionNew: "/user/events/new",
    actionManage: "/user/events",
    name: "Event",
    icon: "ph:calendar-blank-duotone",
    isEnabled: false,
  },
  {
    actionNew: "/user/tags/new",
    actionManage: "/user/tags",
    name: "Tag",
    icon: "ph:tag-duotone",
    isEnabled: false,
  },
  {
    actionNew: "/user/categories/new",
    actionManage: "/user/categories",
    name: "Category",
    icon: "ph:squares-four-duotone",
    isEnabled: false,
  },
  {
    actionNew: "/user/images/new",
    actionManage: "/user/images",
    name: "Image",
    icon: "ph:image-duotone",
    isEnabled: false,
  },
  {
    actionNew: "/admin/users/new",
    actionManage: "/user/users",
    name: "User",
    icon: "ph:user-duotone",
    isEnabled: false,
  },
]
