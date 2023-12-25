import * as React from "react"

import { cn } from "~/utils/cn"

export interface AnchorProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

const Anchor = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ href, className, children, ...props }, ref) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(className)}
        ref={ref}
        {...props}
      >
        {children}
      </a>
    )
  },
)
Anchor.displayName = "Anchor"

export { Anchor }
