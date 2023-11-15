import { useFetcher } from "@remix-run/react"

import { ButtonLoading } from "~/components/ui/button-loading"
import { Card } from "~/components/ui/card"
import { Iconify } from "~/components/ui/iconify"
import { type ConfigNewItem } from "~/configs/new"
import { cn } from "~/utils/cn"

export function FormNew({ item }: { item: ConfigNewItem }) {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"
  const disabled = item.isEnabled !== true

  return (
    <Card className="p-2">
      <fetcher.Form method="POST" action={item.action} className="w-full">
        <fieldset
          disabled={disabled}
          className="flex flex-col items-center gap-2"
        >
          <div
            className={cn(
              "text-6xl text-primary",
              disabled && "text-muted-foreground",
            )}
          >
            <Iconify icon={item.icon} />
          </div>

          <h4 className={cn(disabled && "text-muted-foreground")}>
            {item.name}
          </h4>

          <ButtonLoading
            disabled={disabled}
            size="sm"
            variant="secondary"
            loadingText="Adding"
            isLoading={isSubmitting}
            className="w-full"
          >
            <Iconify icon="ph:plus" />
            <span>Add</span>
          </ButtonLoading>
        </fieldset>
      </fetcher.Form>
    </Card>
  )
}
