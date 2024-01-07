import * as React from "react"

import { cn } from "~/utils/cn"

export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  noBreak?: boolean
  disabled?: boolean
}

const AnchorText = React.forwardRef<HTMLAnchorElement, AnchorProps>(
  ({ href = "/", noBreak = true, disabled = false, className, children, ...props }, ref) => {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "prose-a-styles font-semibold",
          noBreak && "whitespace-pre",
          disabled && "cursor-not-allowed opacity-75",
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </a>
    )
  },
)
AnchorText.displayName = "AnchorText"

export { AnchorText }
