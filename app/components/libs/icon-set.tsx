/**
 * IconSet
 *
 * Alternative of Iconify if want to preload icons, without fetching to their API
 *
 * - Phosphor Icons: https://phosphoricons.com
 * - Simple Icons: https://simpleicons.org
 */

import { SiGithub, SiRemix } from "@icons-pack/react-simple-icons"
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
