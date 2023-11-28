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
import { configSite } from "~/configs/site"
import { type modelUser } from "~/models/user.server"
import { schemaUserUsername } from "~/schemas/user"
import { type SubmissionResult } from "~/types/submission"

export function FormChangeField({
  label,
  field,
  schema,
  user,
}: {
  label: string
  field: "username"
  schema: typeof schemaUserUsername
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
            <FormLabel htmlFor={fields["username"].id}>{label}</FormLabel>
            <ButtonLoading
              name="intent"
              value="user-update-username"
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
            {...conform.input(fields["username"])}
            id={fields["username"].id}
            placeholder="username"
            spellCheck="false"
          />
          <FormDescription>
            Public @username within {configSite.name} like {configSite.domain}
            /yourname. Use 20 characters at maximum. Only alphabet, number, dot,
            underscore allowed
          </FormDescription>
          <FormErrors>{fields[field]}</FormErrors>
        </FormField>
      </fieldset>
    </fetcher.Form>
  )
}
