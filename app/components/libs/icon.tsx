/**
 * Icon:
 * - Iconify
 * - IconSet
 * - IconMatch
 *
 * Set:
 * - Icônes: https://icones.js.org
 * - Phosphor Icons: https://phosphoricons.com
 * - Remix Icon: https://remixicon.com
 * - Simple Icons: https://simpleicons.org
 *
 * Beware to put them into remix.config serverDependenciesToBundle
 */

import { Icon as Iconify } from "@iconify/react"
import {
  SiDevdotto,
  SiFacebook,
  SiGithub,
  SiGoogle,
  SiHashnode,
  SiInstagram,
  SiLinkedin,
  SiRemix,
  SiTelegram,
  SiThreads,
  SiTwitter,
  SiX as SiXTwitter,
  SiYoutube,
} from "@icons-pack/react-simple-icons"
import {
  ArrowCounterClockwise,
  ArrowSquareOut,
  Binoculars,
  Book,
  BookBookmark,
  BookOpen,
  BookOpenText,
  Books,
  BoundingBox,
  CalendarBlank,
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretDown,
  CaretLeft,
  CaretRight,
  CaretUpDown,
  Check,
  Circle,
  CreditCard,
  Crown,
  CrownSimple,
  DotsSixVertical,
  DotsThree,
  Eye,
  EyeSlash,
  FloppyDisk,
  FolderSimple,
  Gear,
  House,
  Image,
  Info,
  Keyboard,
  Laptop,
  Lightbulb,
  List,
  MagnifyingGlass,
  Moon,
  Notebook,
  NotePencil,
  Notification,
  Plus,
  Question,
  Rectangle,
  Scroll,
  SignIn,
  SignOut,
  SpinnerGap,
  Square,
  SquaresFour,
  Sun,
  Tag,
  Trash,
  User,
  UserPlus,
  UsersFour,
  X as XIcon,
} from "@phosphor-icons/react"
import { RiBold, RiItalic, RiLink, RiLinkUnlink, RiStrikethrough } from "@remixicon/react"
import { match } from "ts-pattern"

import { createSlug } from "~/utils/string"

/**
 * Iconify
 *
 * Fastest way to get various icons without manual import
 */

export { Iconify }

/**
 * IconSet
 *
 * Simple icon import
 */

export const IconSet = {
  Question,
}

/**
 * IconMatch
 *
 * Match based on icon name string
 */

export const IconMatch = ({ icon, ...props }: { icon: string; className?: string }) =>
  match(createSlug(icon))
    .with("archived", () => <Books weight="fill" {...props} />)
    .with("arrow-counter-clockwise", () => <ArrowCounterClockwise {...props} />)
    .with("arrow-square-out", () => <ArrowSquareOut {...props} />)
    .with("binoculars", () => <Binoculars {...props} />)
    .with("book-open-text", () => <BookOpenText {...props} />)
    .with("book-open", () => <BookOpen {...props} />)
    .with("bounding-box", () => <BoundingBox {...props} />)
    .with("button-pointer", () => <Iconify icon="mdi:button-pointer" {...props} />)
    .with("calendar-blank", () => <CalendarBlank {...props} />)
    .with("calendar-cursor", () => <Iconify icon="mdi:calendar-cursor" {...props} />)
    .with("caret-double-left", () => <CaretDoubleLeft {...props} />)
    .with("caret-double-right", () => <CaretDoubleRight {...props} />)
    .with("caret-down", () => <CaretDown {...props} />)
    .with("caret-left", () => <CaretLeft {...props} />)
    .with("caret-right", () => <CaretRight {...props} />)
    .with("caret-up-down", () => <CaretUpDown {...props} />)
    .with("check", () => <Check {...props} />)
    .with("circle", () => <Circle {...props} />)
    .with("credit-card", () => <CreditCard {...props} />)
    .with("crown-simple", () => <CrownSimple {...props} />)
    .with("crown", () => <Crown {...props} />)
    .with("devto", () => <SiDevdotto {...props} />)
    .with("dots-six-vertical", () => <DotsSixVertical {...props} />)
    .with("dots-three", () => <DotsThree {...props} />)
    .with("draft", () => <Notebook weight="fill" {...props} />)
    .with("editor-bold", () => <RiBold {...props} />)
    .with("editor-italic", () => <RiItalic {...props} />)
    .with("editor-link-unlink", () => <RiLinkUnlink {...props} />)
    .with("editor-link", () => <RiLink {...props} />)
    .with("editor-strikethrough", () => <RiStrikethrough {...props} />)
    .with("eye-slash", () => <EyeSlash {...props} />)
    .with("eye", () => <Eye {...props} />)
    .with("facebook", () => <SiFacebook {...props} />)
    .with("floppy-disk", () => <FloppyDisk {...props} />)
    .with("folder-simple", () => <FolderSimple {...props} />)
    .with("form-textbox", () => <Iconify icon="mdi:form-textbox" {...props} />)
    .with("gear", () => <Gear {...props} />)
    .with("github", () => <SiGithub {...props} />)
    .with("google", () => <SiGoogle {...props} />)
    .with("hashnode", () => <SiHashnode {...props} />)
    .with("house", () => <House {...props} />)
    .with("image", () => <Image {...props} />)
    .with("info", () => <Info {...props} />)
    .with("instagram", () => <SiInstagram {...props} />)
    .with("keyboard", () => <Keyboard {...props} />)
    .with("laptop", () => <Laptop {...props} />)
    .with("lightbulb", () => <Lightbulb {...props} />)
    .with("linkedin", () => <SiLinkedin {...props} />)
    .with("list", () => <List {...props} />)
    .with("magnifying-glass", () => <MagnifyingGlass {...props} />)
    .with("moon-full", () => <Iconify icon="mdi:moon-full" {...props} />)
    .with("moon", () => <Moon {...props} />)
    .with("note-pencil", () => <NotePencil {...props} />)
    .with("notification", () => <Notification {...props} />)
    .with("plus", () => <Plus {...props} />)
    .with("private", () => <Book weight="fill" {...props} />)
    .with("published", () => <BookOpenText weight="fill" {...props} />)
    .with("question", () => <Question {...props} />)
    .with("rectangle", () => <Rectangle {...props} />)
    .with("remix", () => <SiRemix {...props} />)
    .with("scroll", () => <Scroll {...props} />)
    .with("sign-in", () => <SignIn {...props} />)
    .with("sign-out", () => <SignOut {...props} />)
    .with("signIn", () => <SignIn {...props} />)
    .with("spinner-gap", () => <SpinnerGap {...props} />)
    .with("square", () => <Square {...props} />)
    .with("squares-four", () => <SquaresFour {...props} />)
    .with("sun", () => <Sun {...props} />)
    .with("tag", () => <Tag {...props} />)
    .with("telegram", () => <SiTelegram {...props} />)
    .with("threads", () => <SiThreads {...props} />)
    .with("trash", () => <Trash {...props} />)
    .with("twitter", () => <SiTwitter {...props} />)
    .with("typewriter", () => <Iconify icon="mdi:typewriter" {...props} />)
    .with("unlisted", () => <BookBookmark weight="fill" {...props} />)
    .with("user-plus", () => <UserPlus {...props} />)
    .with("user", () => <User {...props} />)
    .with("users-four", () => <UsersFour {...props} />)
    .with("x-twitter", () => <SiXTwitter {...props} />)
    .with("x", () => <XIcon {...props} />)
    .with("youtube", () => <SiYoutube {...props} />)
    .otherwise(() => {
      console.warn("🚧 [WARN] Icon not found:", icon)
      return <Question />
    })
