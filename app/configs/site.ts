/**
 * EDITME: Site Config
 *
 * Site-wide information
 */

// For general purpose
export const configSite = {
  domain: "dogokit-beagle.vercel.app",

  // Recommended: 60 characters
  name: "Dogokit", // Can be different with title
  title: "Dogokit", // Can be different with name
  slug: "dogokit",

  // Recommended: 155-160 characters
  description:
    "Web app template kit using Remix, React, Tailwind CSS, Radix UI, Prisma ORM, and more",

  languageCode: "en",
  countryCode: "US",

  logos: {
    dark: "/images/logos/svg/dogokit-white.svg",
    light: "/images/logos/svg/dogokit-black.svg",
  },

  links: {
    devTo: "https://dev.to/mhaidarhanif",
    facebook: "https://facebook.com/mhaidarhanif",
    github: "https://github.com/mhaidarhanif",
    hashnode: "https://hashnode.com/mhaidarhanif",
    instagram: "https://instagram.com/mhaidarhanif_",
    showwcase: "https://showwcase.com/mhaidarhanif",
    twitter: "https://twitter.com/mhaidarhanif",
    website: "https://dogokit-beagle.vercel.app",
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

  // Setup all the available paths in app/configs/navigation.ts
  navItems: ["/", "/about", "/search", "/posts", "/users", "/examples"],
}

// The order matters on what being shown first
export const configSiteIconLinks = [
  { name: "GitHub", href: "https://github.com/dogokit/dogokit-beagle" },
  { name: "Twitter", href: "https://twitter.com/mhaidarhanif" },
  { name: "X-Twitter", href: "https://x.com/mhaidarhanif" },
  { name: "LinkedIn", href: "https://linkedin.com/in/mhaidarhanif" },
  { name: "YouTube", href: "https://youtube.com/mhaidarhanif" },
  { name: "Facebook", href: "https://facebook.com/mhaidarhanif" },
  { name: "Instagram", href: "https://instagram.com/mhaidarhanif_" },
  { name: "Threads", href: "https://threads.net/mhaidarhanif_" },
  { name: "Telegram", href: "https://t.me/mhaidarhanif" },
]
