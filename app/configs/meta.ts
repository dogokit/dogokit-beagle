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
  domain: configSite.domain,
  url: isDevelopment ? "http://localhost:3000" : `https://${configSite.domain}`,
  themeColor: "#c7d2fe",
  backgroundColor: "#1e1b4b",
  locale: "en_US",
  canonicalPath: "/",
  ogType: "website",
  ogImageAlt: configSite.title,
  ogImageType: "image/png",
  ogImagePath: "/opengraph/dogokit-og.png", // Recommended: 1200 x 630
  twitterImagePath: "/opengraph/dogokit-og.png", // Recommended: 1024 x 512
  fbAppId: "",
  author: configSite.author,
  company: configSite.company,
}
