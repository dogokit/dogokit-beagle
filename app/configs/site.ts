/**
 * EDITME: Site Config
 *
 * Site-wide information
 */

// eslint-disable-next-line node/no-process-env
const isDevelopment = process.env.NODE_ENV === "development"

// For general purpose
export const configSite = {
  domain: isDevelopment ? "localhost:3000" : "dogokit.allnimal.com",

  slug: "dogokit",
  name: "Dogokit", // Can be different with title
  title: "Dogokit", // Can be different with name
  description:
    "Web app template kit using Remix, React, Tailwind CSS, Radix UI, Prisma ORM, and more",

  links: {
    devTo: "https://dev.to/mhaidarhanif",
    facebook: "https://facebook.com/mhaidarhanif",
    github: "https://github.com/mhaidarhanif",
    hashnode: "https://hashnode.com/mhaidarhanif",
    instagram: "https://instagram.com/mhaidarhanif_",
    showwcase: "https://showwcase.com/mhaidarhanif",
    twitter: "https://twitter.com/mhaidarhanif",
    website: "https://dogokit.allnimal.com",
    youtube: "https://youtube.com/mhaidarhanif",
  },

  twitter: {
    site: "@mhaidarhanif",
    creator: "@mhaidarhanif",
  },

  navItems: [
    { to: "/", name: "Home", icon: "ph:home-duotone" },
    { to: "/about", name: "About", icon: "ph:about-duotone" },
    { to: "/posts", name: "Posts", icon: "ph:post-duotnoe" },
  ],
}
