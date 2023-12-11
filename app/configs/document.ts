/**
 * Config Document Links and JSON-LD
 *
 * Favicons
 * Manifest
 * Style Sheets
 */

import { cssBundleHref } from "@remix-run/css-bundle"

import { fontLinks } from "~/configs/fonts"
import { configMeta } from "~/configs/meta"
import tailwindStyles from "~/styles/tailwind.css"

const stylesheetLinks = [
  { rel: "stylesheet", href: tailwindStyles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]

/**
 * Docs:
 * - https://favicon.io
 * - https://realfavicongenerator.net
 * - https://evilmartians.com/chronicles/how-to-favicon-in-2021-six-files-that-fit-most-needs
 */

const faviconLinks = [
  /**
   * Use this if want to change the favicon quickly using emoji
   * Or design and use custom favicon, or get some initial image from:
   * https://emojipedia.org
   */
  // {
  // 	rel: 'shortcut icon',
  // 	href: 'https://fav.farm/⚫',
  // },
  {
    rel: "shortcut icon",
    href: "/favicons/favicon.ico",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicons/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicons/favicon-16x16.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicons/apple-touch-icon.png",
  },
  {
    rel: "mask-icon",
    href: "/favicons/safari-pinned-tab.svg",
    color: String(configMeta.themeColor),
  },
]

const manifestLinks = [
  /**
   * Edit the manifest in app/routes/_app.site[.]webmanifest.tsx
   */
  {
    rel: "manifest",
    href: "/site.webmanifest",
  },
]

export const configDocumentLinks = [
  ...fontLinks,
  ...stylesheetLinks,
  ...faviconLinks,
  ...manifestLinks,
]
