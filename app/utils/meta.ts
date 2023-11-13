import { configMeta } from "~/configs/meta"
import { configSite } from "~/configs/site"

export interface CreateMeta {
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
  title = configMeta.defaultTitle,
  description = configMeta.defaultDescription,
  locale = configMeta.locale,
  name = configMeta.defaultName,
  ogImageAlt = configMeta.ogImageAlt,
  ogImagePath = configMeta.ogImagePath,
  ogImageType = configMeta.ogImageType,
  ogType = configMeta.ogType,
  canonicalPath = "/",
  themeColor = configMeta.color,
  twitterAuthorHandle = configMeta.author.handle,
  twitterImagePath = configMeta.twitterImagePath,
  url = configMeta.url,
}: CreateMeta = configMeta) {
  return [
    {
      title:
        title === configMeta.defaultTitle
          ? configMeta.defaultTitle
          : `${title} ${configMeta.defaultSeparator} ${configMeta.defaultName}`,
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
      content: `${configMeta.url}/browserconfig.xml`,
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
      content: canonicalPath ? `${configMeta.url}${canonicalPath}` : url,
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
        ? `${configMeta.url}${ogImagePath}`
        : `${configMeta.url}${configMeta.ogImagePath}`,
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
      content: configSite.domain,
    },
    {
      name: "twitter:url",
      content: canonicalPath
        ? `${configMeta.url}${canonicalPath}`
        : url || configMeta.url,
    },
    {
      name: "twitter:image",
      content: twitterImagePath
        ? `${configMeta.url}${twitterImagePath}`
        : `${configMeta.url}${configMeta.twitterImagePath}`,
    },
    {
      name: "fb:app_id",
      content: configMeta.fbAppId,
    },
    {
      tagName: "link",
      rel: "canonical",
      href: canonicalPath ? `${configMeta.url}${canonicalPath}` : url,
    },
    {
      "script:ld+json": {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: configSite.title,
      },
    },
  ]
}
