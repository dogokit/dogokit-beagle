/**
 * IconSet
 *
 * Alternative of Iconify if want to preload icons, without fetching to their API
 * Beware to put them into remix.config serverDependenciesToBundle
 *
 * - Phosphor Icons: https://phosphoricons.com
 * - Remix Icon: https://remixicon.com
 */

import {
  SiDevdotto,
  SiFacebook,
  SiGithub,
  SiHashnode,
  SiInstagram,
  SiLinkedin,
  SiRemix,
  SiTelegram,
  SiThreads,
  SiTwitter,
  SiX,
  SiYoutube,
} from "@icons-pack/react-simple-icons"
import {
  ArrowSquareOut,
  Binoculars,
  BoundingBox,
  Crown,
  CrownSimple,
  Gear,
  House,
  Info,
  Keyboard,
  Laptop,
  List,
  MagnifyingGlass,
  Moon,
  Notification,
  Plus,
  Question,
  Rectangle,
  Scroll,
  SignIn,
  SignOut,
  Square,
  Sun,
  User,
  UserPlus,
  UsersFour,
} from "@phosphor-icons/react"
import { match } from "ts-pattern"

import { createSlug } from "~/utils/string"

/**
 * IconSet
 *
 * Simple icon import
 */

export const IconSet = {
  ArrowSquareOut,
  Binoculars,
  BoundingBox,
  Crown,
  CrownSimple,
  Gear,
  House,
  Info,
  Keyboard,
  Laptop,
  List,
  MagnifyingGlass,
  Moon,
  Notification,
  Plus,
  Question,
  Rectangle,
  Scroll,
  SignIn,
  SignOut,
  Square,
  Sun,
  User,
  UserPlus,
  UsersFour,
  Devdotto: SiDevdotto,
  Facebook: SiFacebook,
  GitHub: SiGithub,
  Hashnode: SiHashnode,
  Instagram: SiInstagram,
  LinkedIn: SiLinkedin,
  Remix: SiRemix,
  Telegram: SiTelegram,
  Threads: SiThreads,
  Twitter: SiTwitter,
  XTwitter: SiX,
  YouTube: SiYoutube,
}

/**
 * IconMatch
 *
 * More flexible in case using icon system other than Iconify
 * Because can return a customizable output
 */

export const IconMatch = ({ icon }: { icon: string; className?: string }) =>
  match(createSlug(icon))
    .with("question", () => <Question />)
    .with("devto", () => <SiDevdotto />)
    .with("hashnode", () => <SiHashnode />)
    .with("facebook", () => <SiFacebook />)
    .with("github", () => <SiGithub />)
    .with("instagram", () => <SiInstagram />)
    .with("linkedin", () => <SiLinkedin />)
    .with("telegram", () => <SiTelegram />)
    .with("threads", () => <SiThreads />)
    .with("twitter", () => <SiTwitter />)
    .with("x", () => <SiX />)
    .with("youtube", () => <SiYoutube />)
    .otherwise(() => <Question />)
