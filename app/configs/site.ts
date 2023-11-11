/**
 * EDITME: Site Config and Meta Config
 *
 * Site-wide info and meta data, mostly for information and SEO purpose
 */

import { isDevelopment } from "~/utils/env.server"

// For general purpose
export const configSiteGeneral = {
  domain: isDevelopment ? "localhost:3000" : "dogokit.allnimal.com",

  slug: "dogokit",
  name: "Dogokit",
  title: "Dogokit",
  description: "Dogokit Remix template kit",

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
    { to: "/", name: "Home", icon: "ph:home" },
    { to: "/about", name: "About", icon: "ph:about" },
  ],
}

// For Remix meta function
export const configSiteMeta = {
  defaultName: configSiteGeneral?.name,
  defaultTitle: configSiteGeneral?.title,
  defaultTitleSeparator: "—",
  defaultDescription: configSiteGeneral?.description,

  color: "#c7d2fe", // EDITME
  locale: "en_US",
  url: isDevelopment
    ? "http://localhost:3000"
    : `https://${configSiteGeneral?.domain}`,
  canonicalPath: "/",
  ogType: "website",
  ogImageAlt: configSiteGeneral?.title,
  ogImageType: "image/png",
  ogImagePath: "/assets/opengraph/dogokit-og.png",
  twitterImagePath: "/assets/opengraph/dogokit-og.png",
  fbAppId: "",

  author: {
    name: "M Haidar Hanif",
    handle: "@mhaidarhanif",
    url: "https://mhaidarhanif.com",
    company: {
      name: "Allnimal",
      handle: "@allnimal",
      url: "https://allnimal.com",
    },
  },

  mailingListName: "All-in-One Kit",
}
