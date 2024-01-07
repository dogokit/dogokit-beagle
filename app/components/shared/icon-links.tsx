import { IconMatch } from "~/components/libs/icon"
import { Anchor } from "~/components/ui/anchor"
import { configSiteIconLinks } from "~/configs/site"
import { cn } from "~/utils/cn"

export function IconLinks({
  className,
  classNameIcon,
  ...props
}: React.HTMLAttributes<HTMLUListElement> & {
  classNameIcon?: string
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)} {...props}>
      {configSiteIconLinks.map(iconLink => (
        <li key={iconLink.href}>
          <Anchor
            href={iconLink.href}
            className={cn(
              "focus-ring block rounded-md p-2 text-xl transition hover:text-primary/80",
              classNameIcon,
            )}
          >
            <IconMatch icon={iconLink.name} />
            <span className="sr-only">{iconLink.name}</span>
          </Anchor>
        </li>
      ))}
    </ul>
  )
}
