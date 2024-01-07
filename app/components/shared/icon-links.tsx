import { match } from "ts-pattern"

import { IconSet } from "~/components/libs/icon-set"
import { Anchor } from "~/components/ui/anchor"
import { configSiteIconLinks } from "~/configs/site"
import { cn } from "~/utils/cn"
import { createSlug } from "~/utils/string"

/**
 * This way is more flexible in case using icon system other than Iconify
 * Because can return a customizable component, not just a string
 */
const getIcon = (name: string) =>
  match(createSlug(name))
    .with("devto", () => <IconSet.Devdotto />)
    .with("hashnode", () => <IconSet.Hashnode />)
    .with("facebook", () => <IconSet.Facebook />)
    .with("github", () => <IconSet.GitHub />)
    .with("instagram", () => <IconSet.Instagram />)
    .with("linkedin", () => <IconSet.LinkedIn />)
    .with("telegram", () => <IconSet.Telegram />)
    .with("threads", () => <IconSet.Threads />)
    .with("twitter", () => <IconSet.Twitter />)
    .with("x", () => <IconSet.XTwitter />)
    .with("youtube", () => <IconSet.YouTube />)
    .otherwise(() => <IconSet.Question />)

// IDEA: Icon links size variant
export function IconLinks({
  className,
  classNameIcon,
  ...props
}: React.HTMLAttributes<HTMLUListElement> & {
  classNameIcon?: string
}) {
  return (
    <ul
      className={cn("flex flex-wrap items-center gap-2", className)}
      {...props}
    >
      {configSiteIconLinks.map(iconLink => (
        <li key={iconLink.href}>
          <Anchor
            href={iconLink.href}
            className={cn(
              "focus-ring block rounded-md p-2 text-xl transition hover:text-primary/80",
              classNameIcon,
            )}
          >
            {getIcon(iconLink.name)}
            <span className="sr-only">{iconLink.name}</span>
          </Anchor>
        </li>
      ))}
    </ul>
  )
}
