import { type DataFunctionArgs } from "@remix-run/node"
import { configMeta } from "~/configs/meta"

import { getDomainUrl } from "~/utils/url.server"

// EDITME: Based on actual size of image assets in /app/public/pwa
const maskableIconSizes = [512, 192, 128]
const iconSizes = [512, 192, 180, 128, 120]

export function loader({ request }: DataFunctionArgs) {
  return {
    id: "/",
    name: configMeta.defaultName,
    short_name: configMeta.defaultName,
    description: configMeta.defaultDescription,
    theme_color: String(configMeta.themeColor),
    background_color: String(configMeta.backgroundColor),
    display: "standalone",
    display_override: ["fullscreen", "minimal-ui"],
    orientation: "portrait-primary",
    start_url: getDomainUrl(request),
    scope: getDomainUrl(request),
    icons: [
      ...maskableIconSizes.map(size => ({
        purpose: "maskable",
        src: `/pwa/dogokit-maskable-${size}.png`,
        type: "image/png",
        sizes: `${size}x${size}`,
      })),
      ...iconSizes.map(size => ({
        src: `/pwa/dogokit-icon-${size}.png`,
        type: "image/png",
        sizes: `${size}x${size}`,
      })),
    ],
    screenshots: [
      {
        src: "/pwa/dogokit-wide.png",
        type: "image/png",
        sizes: "720x540",
        form_factor: "wide",
      },
      {
        src: "/pwa/dogokit-narrow.png",
        type: "image/png",
        sizes: "540x720",
        form_factor: "narrow",
      },
    ],
  }
}
