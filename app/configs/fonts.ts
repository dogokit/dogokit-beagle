/**
 * EDITME: Fonts Config
 *
 * Setup for Tailwind in tailwind.config.ts
 */

import headingFontStyles from "@fontsource-variable/archivo/wght.css"
import monoFontStyles from "@fontsource-variable/chivo-mono/wght.css"
import brandFontStyles from "@fontsource-variable/grandstander/wght.css"
import sansFontStyles from "@fontsource-variable/public-sans/wght.css"

export const fontLinks = [
  { rel: "stylesheet", href: headingFontStyles },
  { rel: "stylesheet", href: brandFontStyles },
  { rel: "stylesheet", href: monoFontStyles },
  { rel: "stylesheet", href: sansFontStyles },
]
