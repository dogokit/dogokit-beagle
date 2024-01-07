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
    actionNew: "/user/posts/create",
    actionManage: "/user/posts",
    name: "Post",
    icon: "scroll",
    isEnabled: true,
  },
  {
    actionNew: "/user/events/create",
    actionManage: "/user/events",
    name: "Event",
    icon: "calendar-blank",
    isEnabled: false,
  },
  {
    actionNew: "/user/tags/create",
    actionManage: "/user/tags",
    name: "Tag",
    icon: "tag",
    isEnabled: false,
  },
  {
    actionNew: "/user/categories/create",
    actionManage: "/user/categories",
    name: "Category",
    icon: "squares-four",
    isEnabled: false,
  },
  {
    actionNew: "/user/images/create",
    actionManage: "/user/images",
    name: "Image",
    icon: "image",
    isEnabled: false,
  },
  {
    actionNew: "/admin/users/create",
    actionManage: "/user/users",
    name: "User",
    icon: "user",
    isEnabled: false,
  },
]
