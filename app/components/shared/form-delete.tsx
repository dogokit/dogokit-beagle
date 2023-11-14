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
  intentValue,
  itemText,
  name = "id",
  defaultValue,
  buttonText = "Delete",
  requireUser,
  userId,
  extraComponent,
}: {
  intentValue: string // Example: delete-by-id
  itemText: string // Example: post name
  name?: string // Optional because can be with/without input name=id
  defaultValue?: string // Optional because can be with/without id value
  buttonText?: string
  requireUser?: boolean
  userId?: string
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
          <span>{buttonText}</span>
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
            {name && defaultValue && (
              <input type="hidden" name={name} defaultValue={defaultValue} />
            )}

            {requireUser && userId && (
              <input type="hidden" name="userId" defaultValue={userId} />
            )}

            {extraComponent}

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
