/**
 * IconSet
 *
 * Alternative of Iconify if want to preload icons, without fetching to their API
 *
 * - react-icons: https://react-icons.github.io/react-icons
 * - Phosphor Icons: https://phosphoricons.com
 * - Simple Icons: https://simpleicons.org
 */

import { Laptop, List, Moon, Plus, Sun } from "@phosphor-icons/react"
import { SiGithub, SiRemix } from "react-icons/si"

export const IconSet = {
  Laptop,
  Moon,
  Sun,
  List,
  Plus,
  Remix: SiRemix,
  GitHub: SiGithub,
}
