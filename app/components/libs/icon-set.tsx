/**
 * IconSet
 *
 * Alternative of Iconify if want to preload icons, without fetching to their API
 *
 * - react-icons: https://react-icons.github.io/react-icons
 * - Phosphor Icons: https://phosphoricons.com
 * - Simple Icons: https://simpleicons.org
 */

import {
  House,
  Info,
  Laptop,
  List,
  Moon,
  Plus,
  Sun,
  type Icon,
} from "@phosphor-icons/react"
import { type IconType } from "react-icons"
import { SiGithub, SiRemix } from "react-icons/si/index.js"

export type IconReactIcons = IconType
export type IconPhosphor = Icon

export const IconSet = {
  Laptop,
  Moon,
  Sun,
  List,
  Plus,
  House,
  Info,
  Remix: SiRemix,
  GitHub: SiGithub,
}
