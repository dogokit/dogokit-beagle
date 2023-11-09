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

import { Alert } from "~/components/ui/alert"
import { ButtonLoading } from "~/components/ui/button-loading"
import { FormDescription, FormField, FormLabel } from "~/components/ui/form"
import { Input, InputPassword } from "~/components/ui/input"
import { LinkText } from "~/components/ui/link-text"
import { useAppMode } from "~/hooks/use-app-mode"
import { prisma } from "~/libs/db.server"
import { modelUser } from "~/models/user.server"
import { schemaUserSignUp } from "~/schemas/user"
import { authenticator } from "~/services/auth.server"
import { createTimer } from "~/utils/timer"

export const meta: MetaFunction = () => {
  return [{ title: "Sign Up" }]
}

export const loader = ({ request }: ActionFunctionArgs) => {
  return authenticator.isAuthenticated(request, {
    successRedirect: "/user/dashboard",
  })
}

export default function SignUpRoute() {
  const actionData = useActionData<typeof action>()

  const { isModeDevelopment } = useAppMode()

  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get("redirectTo")

  const [form, { email, fullname, username, password }] = useForm<
    z.infer<typeof schemaUserSignUp>
  >({
    id: "signup-form",
    lastSubmission: actionData?.submission,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
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
      <div className="mx-auto max-w-sm space-y-10">
        <header className="space-y-4">
          <h2>Create a new account</h2>
          <p>
            Already have an account? <LinkText to="/login">Log in</LinkText>
          </p>
        </header>

        <Form
          action="/signup"
          method="POST"
          className="flex flex-col gap-2"
          {...form.props}
        >
          <fieldset className="flex flex-col gap-2" disabled={isSubmitting}>
            <FormField>
              <FormLabel htmlFor={fullname.id}>Full Name</FormLabel>
              <Input
                {...conform.input(fullname)}
                id={fullname.id}
                placeholder="Full Name"
                autoFocus={fullname.error ? true : undefined}
                required
              />
              {fullname.errors && fullname.errors?.length > 0 && (
                <ul>
                  {fullname.errors?.map((error, index) => (
                    <li key={index}>
                      <Alert variant="destructive">{error}</Alert>
                    </li>
                  ))}
                </ul>
              )}
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
              {email.errors && email.errors?.length > 0 && (
                <ul>
                  {email.errors?.map((error, index) => (
                    <li key={index}>
                      <Alert variant="destructive">{error}</Alert>
                    </li>
                  ))}
                </ul>
              )}
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
              {username.errors && username.errors?.length > 0 && (
                <ul>
                  {username.errors?.map((error, index) => (
                    <li key={index}>
                      <Alert variant="destructive">{error}</Alert>
                    </li>
                  ))}
                </ul>
              )}
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
              {password.errors && password.errors?.length > 0 && (
                <ul>
                  {password.errors?.map((error, index) => (
                    <li key={index}>
                      <Alert variant="destructive">{error}</Alert>
                    </li>
                  ))}
                </ul>
              )}
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
            <span className="bg-background px-2 text-muted-foreground">
              OR CONTINUE WITH
            </span>
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

  // Differentiate formData request and authenticator request
  const clonedRequest = request.clone()
  const formData = await clonedRequest.formData()

  const submission = await parse(formData, {
    schema: schemaUserSignUp.superRefine(async (data, ctx) => {
      const existingEmail = await prisma.user.findUnique({
        where: { email: data.email },
        select: { id: true },
      })
      if (existingEmail) {
        ctx.addIssue({
          path: ["email"],
          code: z.ZodIssueCode.custom,
          message: "User already exists with this email",
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
          message: "A user already exists with this username",
        })
        return
      }
    }),
    async: true,
  })
  if (!submission.value || submission.intent !== "submit") {
    return json({ status: "error", submission }, { status: 400 })
  }

  const newUser = await modelUser.signup(submission.value)
  if (!newUser) {
    return json({ status: "error", submission }, { status: 500 })
  }

  await timer.delay()
  return authenticator.authenticate("form", request, {
    successRedirect: "/user/dashboard",
  })
}
