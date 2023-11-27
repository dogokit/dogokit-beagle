import { match } from "ts-pattern"

import { Anchor } from "~/components/ui/anchor"
import { Iconify } from "~/components/ui/iconify"
import { configSiteIconLinks } from "~/configs/site"
import { cn } from "~/utils/cn"
import { createSlug } from "~/utils/string"

/**
 * This way is more flexible in case using icon system other than Iconiffy
 */
const getIconName = (name: string) =>
  match(name)
    .with("facebook", () => "simple-icons:facebook")
    .with("github", () => "simple-icons:github")
    .with("linkedin", () => "simple-icons:linkedin")
    .with("instagram", () => "simple-icons:instagram")
    .with("threads", () => "simple-icons:threads")
    .with("telegram", () => "simple-icons:telegram")
    .with("twitter", () => "simple-icons:twitter")
    .with("x", () => "simple-icons:x")
    .with("youtube", () => "simple-icons:youtube")
    .otherwise(() => "simple-line-icons:question")

export function IconLink({ name }: { name: string }) {
  return <Iconify icon={getIconName(createSlug(name))} />
}

// LATER: Component size variant
export function IconLinks() {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {configSiteIconLinks.map(iconLink => (
        <li key={iconLink.href}>
          <Anchor
            href={iconLink.href}
            className={cn(
              "focus-ring block rounded-md p-2 text-xl text-muted-foreground transition hover:text-primary",
            )}
          >
            <IconLink name={iconLink.name} />
          </Anchor>
        </li>
      ))}
    </ul>
  )
}