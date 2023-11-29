export const configSitemapGroups: ConfigSitemapGroup[] = [
  {
    title: "Pages",
    items: [
      { name: "Landing", to: "/" },
      { name: "About", to: "/about" },
      { name: "Search", to: "/search" },
      { name: "Posts", to: "/posts" },
      { name: "Users", to: "/users" },
    ],
  },
  {
    title: "Account",
    items: [
      { name: "Sign Up", to: "/signup" },
      { name: "Log In", to: "/login" },
      { name: "Log Out", to: "/logout" },
      { name: "Dashboard", to: "/user/dashboard" },
    ],
  },
  {
    title: "Misc",
    items: [
      { name: "Blank", to: "/blank" },
      { name: "Components", to: "/components" },
      { name: "Editor Tiptap", to: "/tiptap" },
    ],
  },
  {
    title: "Links",
    items: [
      { name: "🐾 Allnimal", url: "https://allnimal.com" },
      { name: "🐻 Bearmentor", url: "https://bearmentor.com" },
      { name: "🐱 Catamyst", url: "https://catamyst.com" },
      { name: "🐶 Dogokit", url: "https://dogokit.allnimal.com" },
      { name: "🧊 M Haidar Hanif", url: "https://mhaidarhanif.com" },
    ],
  },
]

type ConfigSitemapGroup = {
  title?: string
  items: {
    name: string
    url?: string
    to?: string
  }[]
}
