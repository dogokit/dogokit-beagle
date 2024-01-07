import { useState } from "react"

import { IconMatch } from "~/components/libs/icon"
import { Button, buttonVariants } from "~/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~/components/ui/collapsible"
import { useAppMode } from "~/hooks/use-app-mode"
import { cn } from "~/utils/cn"
import { stringifyCode } from "~/utils/string"

/**
 * Debug
 *
 * Preformat code component to show debugging information.
 */

export function Debug({
  name,
  hidden = false,
  isCollapsibleOpen = false,
  isAlwaysShow = false,
  className,
  children,
}: {
  name?: string
  hidden?: boolean
  isCollapsibleOpen?: boolean
  isAlwaysShow?: boolean
  className?: string
  children?: string | object
}) {
  const { isModeDevelopment } = useAppMode()
  const [isVisible, setIsVisible] = useState(!hidden)
  const [isOpen, setIsOpen] = useState(isCollapsibleOpen)

  if (!isAlwaysShow && !isModeDevelopment) return null
  if (!isVisible) return null

  return (
    <div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-1">
        <div className="flex flex-nowrap gap-1">
          <CollapsibleTrigger className={cn(buttonVariants({ variant: "outline", size: "xs" }))}>
            <span>DEBUG</span>
            {name && <span>: {name}</span>}
          </CollapsibleTrigger>
          <Button variant="outline" size="xs" onClick={() => setIsVisible(false)}>
            <IconMatch icon="x" />
          </Button>
        </div>

        <CollapsibleContent>
          <pre
            className={cn(
              "my-1 overflow-scroll rounded border p-1 text-xs",
              "border-surface-200 dark:border-surface-800 bg-white dark:bg-black",
              "whitespace-pre-wrap", // alternative: break-spaces
              className,
            )}
          >
            {stringifyCode(children)}
          </pre>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
