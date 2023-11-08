/**
 * EDITME: Site Config and Meta Config
 *
 * Site-wide info and meta data, mostly for information and SEO purpose
 */

import { isDevelopment } from "~/utils/env.server"

// For general
export const configSiteGeneral = {
  domain: isDevelopment ? "localhost:3000" : "dogokit.allnimal.com",

  slug: "dogokit-remix",
  name: "Dogokit Remix",
  title: "Dogokit: Remix tempalte kit",
  description: "Dogokit Remix template kit",

  links: {
    website: "https://mhaidarhanif.com",
    github: "https://github.com/mhaidarhanif/rewinds",
    twitter: "https://twitter.com/mhaidarhanif",
    youtube: "https://youtube.com/mhaidarhanif",
    facebook: "https://facebook.com/mhaidarhanif",
    instagram: "https://instagram.com/mhaidarhanif_",
    devTo: "https://dev.to/mhaidarhanif",
    hashnode: "https://hashnode.com/mhaidarhanif",
    showwcase: "https://showwcase.com/mhaidarhanif",
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

  locale: "en_US",
  url: isDevelopment
    ? "http://localhost:3000"
    : `https://${configSiteGeneral?.domain}`,
  canonicalPath: "/",
  color: "#3399cc", // EDITME
  ogType: "website",
  ogImageAlt: configSiteGeneral?.title,
  ogImageType: "image/png",
  ogImagePath: "/assets/opengraph/dogokit-remix-og.png",
  twitterImagePath: "/assets/opengraph/dogokit-remix-og.png",
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
