import { configSiteGeneral, configSiteMeta } from "~/configs/site"

export interface ConfigSiteMeta {
  title?: string
  description?: string
  locale?: string
  name?: string
  ogImageAlt?: string
  ogImagePath?: string
  ogImageType?: string
  ogType?: string
  canonicalPath?: string
  themeColor?: string
  twitterAuthorHandle?: string
  twitterImagePath?: string
  url?: string
}

export function createMeta({
  title = configSiteMeta?.defaultTitle,
  description = configSiteMeta?.defaultDescription,
  locale = configSiteMeta?.locale,
  name = configSiteMeta?.defaultName,
  ogImageAlt = configSiteMeta?.ogImageAlt,
  ogImagePath = configSiteMeta?.ogImagePath,
  ogImageType = configSiteMeta?.ogImageType,
  ogType = configSiteMeta?.ogType,
  canonicalPath = "/",
  themeColor = configSiteMeta?.color,
  twitterAuthorHandle = configSiteMeta?.author.handle,
  twitterImagePath = configSiteMeta?.twitterImagePath,
  url = configSiteMeta?.url,
}: ConfigSiteMeta = configSiteMeta) {
  return [
    {
      title: title
        ? `${title} ${configSiteMeta?.defaultTitleSeparator} ${configSiteMeta?.defaultName}`
        : `${configSiteMeta.defaultTitle}`,
    },
    {
      name: "description",
      content: description,
    },
    {
      name: "application-name",
      content: name,
    },
    {
      name: "apple-mobile-web-app-title",
      content: name,
    },
    {
      name: "theme-color",
      content: themeColor,
    },
    {
      name: "msapplication-TileColor",
      content: themeColor,
    },
    {
      name: "msapplication-config",
      content: `${configSiteMeta?.url}/browserconfig.xml`,
    },
    {
      property: "og:site_name",
      content: name,
    },
    {
      property: "og:title",
      content: title,
    },
    {
      property: "og:description",
      content: description,
    },
    {
      property: "og:url",
      content: canonicalPath ? `${configSiteMeta?.url}${canonicalPath}` : url,
    },
    {
      property: "og:type",
      content: ogType,
    },
    {
      property: "og:locale",
      content: locale,
    },
    {
      property: "og:image:alt",
      content: ogImageAlt,
    },
    {
      property: "og:image:type",
      content: ogImageType,
    },
    {
      property: "og:image",
      content: ogImagePath
        ? `${configSiteMeta?.url}${ogImagePath}`
        : `${configSiteMeta?.url}${configSiteMeta?.ogImagePath}`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: twitterAuthorHandle,
    },
    {
      name: "twitter:creator",
      content: twitterAuthorHandle,
    },
    {
      name: "twitter:title",
      content: title,
    },
    {
      name: "twitter:description",
      content: description,
    },
    {
      name: "twitter:domain",
      content: configSiteGeneral?.domain,
    },
    {
      name: "twitter:url",
      content: canonicalPath
        ? `${configSiteMeta?.url}${canonicalPath}`
        : url || configSiteMeta?.url,
    },
    {
      name: "twitter:image",
      content: twitterImagePath
        ? `${configSiteMeta?.url}${twitterImagePath}`
        : `${configSiteMeta?.url}${configSiteMeta?.twitterImagePath}`,
    },
    {
      name: "fb:app_id",
      content: configSiteMeta?.fbAppId,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: canonicalPath ? `${configSiteMeta?.url}${canonicalPath}` : url,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: configSiteGeneral?.title,
      },
    },
  ]
}
