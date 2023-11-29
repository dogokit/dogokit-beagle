import { conform, useForm } from "@conform-to/react"
import { getFieldsetConstraint, parse } from "@conform-to/zod"
import { type Prisma } from "@prisma/client"
import { useFetcher } from "@remix-run/react"
import { type z } from "zod"

import { ButtonLoading } from "~/components/ui/button-loading"
import {
  FormDescription,
  FormErrors,
  FormField,
  FormLabel,
} from "~/components/ui/form"
import { Iconify } from "~/components/ui/iconify"
import { Input } from "~/components/ui/input"
import { type modelUser } from "~/models/user.server"
import {
  type schemaUserFullName,
  type schemaUserNickName,
  type schemaUserUsername,
} from "~/schemas/user"
import { type SubmissionResult } from "~/types/submission"

export function FormChangeField({
  label,
  field,
  intentValue,
  description,
  schema,
  user,
}: {
  label: string
  field: "username" | "fullname" | "nickname"
  intentValue: string
  description: string
  schema:
    | typeof schemaUserUsername
    | typeof schemaUserFullName
    | typeof schemaUserNickName
  user: Prisma.PromiseReturnType<typeof modelUser.getForSession>
}) {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  const [form, fields] = useForm<z.infer<typeof schema>>({
    lastSubmission: fetcher.data as SubmissionResult,
    shouldRevalidate: "onInput",
    constraint: getFieldsetConstraint(schema),
    onValidate({ formData }) {
      return parse(formData, { schema: schema })
    },
    defaultValue: user,
  })

  return (
    <fetcher.Form {...form.props} method="POST">
      <fieldset disabled={isSubmitting} className="space-y-2">
        <input {...conform.input(fields.id, { type: "hidden" })} />
        <FormField>
          <div className="flex justify-between">
            <FormLabel htmlFor={fields[field].id}>{label}</FormLabel>
            <ButtonLoading
              name="intent"
              value={intentValue}
              isLoading={isSubmitting}
              variant="outline"
              size="xs"
              loadingText="Saving"
              iconComponent={<Iconify icon="ph:floppy-disk-duotone" />}
            >
              Save
            </ButtonLoading>
          </div>
          <Input
            {...conform.input(fields[field])}
            id={fields[field].id}
            placeholder={label}
            spellCheck="false"
          />
          <FormDescription>{description}</FormDescription>
          <FormErrors>{fields[field]}</FormErrors>
        </FormField>
      </fieldset>
    </fetcher.Form>
  )
}
