import { type DataFunctionArgs } from "@remix-run/node"

import { getDomainURL } from "~/utils/url.server"

// EDIME: Based on actual image assets in /app/public/pwa
const maskableIconSizes = [512, 192, 128]
const iconSizes = [512, 192, 180, 128, 120]

export function loader({ request }: DataFunctionArgs) {
  return {
    id: "/",
    name: "Dogokit",
    short_name: "Dogokit",
    description: "Dogokit Remix demo app",
    theme_color: "#1e1b4b",
    background_color: "#c7d2fe",
    display: "standalone",
    display_override: ["fullscreen", "minimal-ui"],
    orientation: "portrait-primary",
    start_url: getDomainURL(request),
    scope: getDomainURL(request),
    icons: [
      ...maskableIconSizes.map(size => {
        return {
          purpose: "maskable",
          src: `/pwa/dogokit-maskable-${size}.png`,
          sizes: `${size}x${size}`,
          type: "image/png",
        }
      }),
      ...iconSizes.map(size => {
        return {
          src: `/pwa/dogokit-icon-${size}.png`,
          sizes: `${size}x${size}`,
          type: "image/png",
        }
      }),
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
