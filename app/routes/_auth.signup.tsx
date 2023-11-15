import { conform, useForm } from "@conform-to/react"
import { getFieldsetConstraint, parse } from "@conform-to/zod"
import {
  json,
  type ActionFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import {
  Form,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react"
import { z } from "zod"

import { AuthButtons } from "~/components/shared/auth-buttons"
import { ButtonLoading } from "~/components/ui/button-loading"
import {
  FormDescription,
  FormErrors,
  FormField,
  FormLabel,
} from "~/components/ui/form"
import { Iconify } from "~/components/ui/iconify"
import { Input, InputPassword } from "~/components/ui/input"
import { LinkText } from "~/components/ui/link-text"
import { useAppMode } from "~/hooks/use-app-mode"
import { prisma } from "~/libs/db.server"
import { modelUser } from "~/models/user.server"
import { schemaUserSignUp } from "~/schemas/user"
import { authenticator } from "~/services/auth.server"
import { createMeta } from "~/utils/meta"
import { createTimer } from "~/utils/timer"

export const meta: MetaFunction = () =>
  createMeta({
    title: `Sign Up`,
    description: `Create a new account`,
  })

export const loader = ({ request }: ActionFunctionArgs) => {
  return authenticator.isAuthenticated(request, {
    successRedirect: "/user/dashboard",
  })
}

export default function SignUpRoute() {
  const actionData = useActionData<typeof action>()

  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirectTo")

  const { isModeDevelopment } = useAppMode()

  const [form, { email, fullname, username, password }] = useForm<
    z.infer<typeof schemaUserSignUp>
  >({
    id: "signup",
    lastSubmission: actionData?.submission,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onInput",
    constraint: getFieldsetConstraint(schemaUserSignUp),
    onValidate({ formData }) {
      return parse(formData, { schema: schemaUserSignUp })
    },
    defaultValue: isModeDevelopment
      ? {
          email: "example@example.com",
          fullname: "Example Name",
          username: "example",
          password: "exampleexample",
        }
      : {},
  })

  return (
    <div className="site-container">
      <div className="site-compact">
        <header className="site-header">
          <h2 className="inline-flex items-center gap-2">
            <Iconify icon="ph:user-plus-duotone" />
            <span>Create a new account</span>
          </h2>
          <p>
            Already have an account?{" "}
            <LinkText to="/login" className="transition hover:text-primary">
              Log in
            </LinkText>
          </p>
        </header>

        <Form
          replace
          action="/signup"
          method="POST"
          className="flex flex-col gap-2"
          {...form.props}
        >
          <fieldset className="flex flex-col gap-2" disabled={isSubmitting}>
            {/* LATER: FormFieldBuilder component */}
            <FormField>
              <FormLabel htmlFor={fullname.id}>Full Name</FormLabel>
              <Input
                {...conform.input(fullname)}
                id={fullname.id}
                placeholder="Full Name"
                autoFocus={fullname.error ? true : undefined}
                required
              />
              <FormErrors>{fullname}</FormErrors>
            </FormField>

            <FormField>
              <FormLabel htmlFor={email.id}>Email</FormLabel>
              <Input
                {...conform.input(email, { type: "email", description: true })}
                id={email.id}
                placeholder="yourname@example.com"
                autoCapitalize="none"
                autoCorrect="off"
                autoFocus={email.error ? true : undefined}
                required
              />
              <FormErrors>{email}</FormErrors>
            </FormField>

            <FormField>
              <FormLabel htmlFor={username.id}>Username</FormLabel>
              <Input
                {...conform.input(username)}
                id={username.id}
                placeholder="username"
                autoFocus={username.error ? true : undefined}
                required
              />
              <FormDescription id={password.descriptionId}>
                4 to 20 characters (letters, numbers, dot, underscore)
              </FormDescription>
              <FormErrors>{username}</FormErrors>
            </FormField>

            <FormField>
              <FormLabel htmlFor={password.id}>Password</FormLabel>
              <InputPassword
                {...conform.input(password, {
                  description: true,
                })}
                id={password.id}
                placeholder="Enter password (at least 8 characters)"
                autoComplete="current-password"
                autoFocus={password.error ? true : undefined}
                required
              />
              <FormDescription id={password.descriptionId}>
                8 characters or more
              </FormDescription>
              <FormErrors>{password}</FormErrors>
            </FormField>

            {redirectTo ? (
              <input type="hidden" name="redirectTo" value={redirectTo} />
            ) : null}

            <ButtonLoading
              type="submit"
              loadingText="Signing Up..."
              isLoading={isSubmitting}
            >
              Sign Up
            </ButtonLoading>
          </fieldset>
        </Form>

        <section className="flex flex-col">
          <hr className="h-0 border-t" />
          <div className="-mt-2 text-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">OR</span>
          </div>
        </section>

        <section className="space-y-2">
          <AuthButtons />
        </section>
      </div>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const clonedRequest = request.clone()
  const formData = await clonedRequest.formData()

  const submission = await parse(formData, {
    async: true,
    schema: schemaUserSignUp.superRefine(async (data, ctx) => {
      const existingEmail = await prisma.user.findUnique({
        where: { email: data.email },
        select: { id: true },
      })
      if (existingEmail) {
        ctx.addIssue({
          path: ["email"],
          code: z.ZodIssueCode.custom,
          message: "Email cannot be used",
        })
        return
      }

      const existingUsername = await prisma.user.findUnique({
        where: { username: data.username },
        select: { id: true },
      })
      if (existingUsername) {
        ctx.addIssue({
          path: ["username"],
          code: z.ZodIssueCode.custom,
          message: "Username cannot be used",
        })
        return
      }
    }),
  })

  if (!submission.value || submission.intent !== "submit") {
    await timer.delay()
    return json({ status: "error", submission }, { status: 400 })
  }

  const newUser = await modelUser.signup(submission.value)

  if (!newUser) {
    await timer.delay()
    return json({ status: "error", submission }, { status: 500 })
  }

  await timer.delay()
  return authenticator.authenticate("form", request, {
    successRedirect: "/user/dashboard",
  })
}
