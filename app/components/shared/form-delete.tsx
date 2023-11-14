import { useFetcher } from "@remix-run/react"
import { useState } from "react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { ButtonLoading } from "~/components/ui/button-loading"
import { Iconify } from "~/components/ui/iconify"

export function FormDelete({
  name = "id",
  itemText = "item",
  defaultValue,
  intentValue = "delete-by-id",
  extraComponent,
}: {
  name?: string
  itemText?: string
  defaultValue: string
  intentValue?: string
  extraComponent?: React.ReactNode
}) {
  const [open, setOpen] = useState<boolean>()
  const fetcher = useFetcher()
  const isSubmitting =
    fetcher.state !== "idle" && fetcher.formMethod === "DELETE"

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="xs">
          <Iconify icon="ph:trash-duotone" />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemText}?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete {itemText}. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <fetcher.Form
            method="DELETE"
            onSubmit={event => {
              fetcher.submit(event.currentTarget.form, { method: "DELETE" })
              setOpen(false)
            }}
          >
            {extraComponent}
            <input type="hidden" name={name} defaultValue={defaultValue} />
            <ButtonLoading
              type="submit"
              size="sm"
              variant="destructive"
              name="intent"
              value={intentValue}
              loadingText="Deleting..."
              isLoading={isSubmitting}
            >
              Delete
            </ButtonLoading>
          </fetcher.Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
