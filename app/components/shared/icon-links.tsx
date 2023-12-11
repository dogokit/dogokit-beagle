import { match } from "ts-pattern"

import { Anchor } from "~/components/ui/anchor"
import { Iconify } from "~/components/ui/iconify"
import { configSiteIconLinks } from "~/configs/site"
import { cn } from "~/utils/cn"
import { createSlug } from "~/utils/string"

/**
 * This way is more flexible in case using icon system other than Iconify
 * Because can return a customizable component, not just a string
 */
const getIconName = (name: string) =>
  match(name)
    .with("devto", () => "simple-icons:devdotto")
    .with("hashnode", () => "simple-icons:hashnode")
    .with("facebook", () => "simple-icons:facebook")
    .with("github", () => "simple-icons:github")
    .with("instagram", () => "simple-icons:instagram")
    .with("linkedin", () => "simple-icons:linkedin")
    .with("telegram", () => "simple-icons:telegram")
    .with("threads", () => "simple-icons:threads")
    .with("twitter", () => "simple-icons:twitter")
    .with("x", () => "simple-icons:x")
    .with("youtube", () => "simple-icons:youtube")
    .otherwise(() => "simple-line-icons:question")

function IconLink({ name }: { name: string }) {
  return <Iconify icon={getIconName(createSlug(name))} />
}

// IDEA: Component size variant
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
            <IconLink name={iconLink.name} />
          </Anchor>
        </li>
      ))}
    </ul>
  )
}
