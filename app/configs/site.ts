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

  // Recommended: 60 characters
  name: "Dogokit", // Can be different with title
  title: "Dogokit", // Can be different with name
  slug: "dogokit",

  // Recommended: 155-160 characters
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

  author: {
    name: "M Haidar Hanif",
    handle: "@mhaidarhanif",
    url: "https://mhaidarhanif.com",
  },

  company: {
    name: "Allnimal",
    handle: "@allnimal",
    url: "https://allnimal.com",
  },

  mailingListName: "All-in-One Kit",

  // Customize in app/configs/navigation.ts
  navItems: ["/", "/about", "/posts"],
}
