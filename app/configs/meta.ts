/**
 * EDITME: Meta Config
 *
 * Meta data for SEO purpose and Remix meta function
 */

import { configSite } from "~/configs/site"

// eslint-disable-next-line node/no-process-env
const isDevelopment = process.env.NODE_ENV === "development"

export const configMeta = {
  defaultName: configSite.name,
  defaultTitle: configSite.title,
  defaultDescription: configSite.description,
  defaultSeparator: "—",

  url: isDevelopment ? "http://localhost:3000" : `https://${configSite.domain}`,
  color: "#c7d2fe", // EDITME
  locale: "en_US",
  canonicalPath: "/",
  ogType: "website",
  ogImageAlt: configSite.title,
  ogImageType: "image/png",
  ogImagePath: "/opengraph/dogokit-og.png",
  twitterImagePath: "/opengraph/dogokit-og.png",
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
