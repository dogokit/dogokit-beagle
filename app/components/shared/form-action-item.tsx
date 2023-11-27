import { useFetcher } from "@remix-run/react"

import { ButtonLink } from "~/components/ui/button-link"
import { ButtonLoading } from "~/components/ui/button-loading"
import { Card } from "~/components/ui/card"
import { Iconify } from "~/components/ui/iconify"
import { type ConfigActionItem } from "~/configs/action-item"
import { cn } from "~/utils/cn"

export function FormActionItem({ item }: { item: ConfigActionItem }) {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"
  const disabled = item.isEnabled !== true

  return (
    <Card className="p-2">
      <fetcher.Form method="POST" action={item.actionNew} className="w-full">
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

          <div className="grid w-full grid-rows-2 gap-2">
            <ButtonLoading
              disabled={disabled}
              size="sm"
              loadingText="Adding"
              isLoading={isSubmitting}
            >
              <Iconify icon="ph:plus" />
              <span>Add</span>
            </ButtonLoading>

            <ButtonLink
              to={item.actionManage}
              disabled={disabled}
              size="sm"
              variant="secondary"
            >
              <Iconify icon="ph:folder-simple-duotone" />
              <span>Manage</span>
            </ButtonLink>
          </div>
        </fieldset>
      </fetcher.Form>
    </Card>
  )
}

export function FormActionItemNew({ item }: { item?: ConfigActionItem }) {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  if (!item) return null

  return (
    <fetcher.Form method="POST" action={item.actionNew}>
      <ButtonLoading
        variant="outline"
        size="xs"
        loadingText="Adding"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        <Iconify icon="ph:plus" />
        <span>Add {item.name}</span>
      </ButtonLoading>
    </fetcher.Form>
  )
}
