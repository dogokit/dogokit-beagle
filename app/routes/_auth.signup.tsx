import { conform, useForm } from "@conform-to/react"
import { getFieldsetConstraint, parse } from "@conform-to/zod"
import { type ActionFunctionArgs } from "@remix-run/node"
import { Form, useNavigation } from "@remix-run/react"
import { useId } from "react"
import { type z } from "zod"

import { Alert } from "~/components/ui/alert"
import { Button } from "~/components/ui/button"
import { ButtonLoading } from "~/components/ui/button-loading"
import { FormDescription, FormField, FormLabel } from "~/components/ui/form"
import { Iconify } from "~/components/ui/iconify"
import { Input, InputPassword } from "~/components/ui/input"
import { LinkText } from "~/components/ui/link-text"
import { schemaUserSignUp } from "~/schemas/user"
import { authenticator, type AuthStrategy } from "~/services/auth.server"
import { AuthStrategies } from "~/services/auth_strategies"

export const loader = async ({ request }: ActionFunctionArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  })
  return null
}

export default function SignUpRoute() {
  const navigation = useNavigation()
  const isSubmitting = navigation.state === "submitting"

  const id = useId()
  const [form, { email, name, username, password }] = useForm<
    z.infer<typeof schemaUserSignUp>
  >({
    id,
    shouldValidate: "onSubmit",
    constraint: getFieldsetConstraint(schemaUserSignUp),
    onValidate({ formData }) {
      return parse(formData, { schema: schemaUserSignUp })
    },
  })

  return (
    <div className="site-container">
      <div className="mx-auto max-w-sm space-y-10 sm:mt-10">
        <header className="space-y-4">
          <h2>Create a Dogokit account</h2>
          <p>
            Already have an account? <LinkText to="/login">Log in</LinkText>
          </p>
        </header>

        <Form
          action={`/auth/${AuthStrategies.FORM}`}
          method="post"
          className="flex flex-col gap-2"
          {...form.props}
        >
          <fieldset className="flex flex-col gap-2" disabled={isSubmitting}>
            <FormField>
              <FormLabel htmlFor={email.id}>Email</FormLabel>
              <Input
                {...conform.input(email, { type: "email", description: true })}
                id={email.id}
                name="email"
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
              <FormLabel htmlFor={name.id}>Full Name</FormLabel>
              <Input
                {...conform.input(name)}
                id={name.id}
                name="name"
                placeholder="Full Name"
                autoFocus={name.error ? true : undefined}
                required
              />
              {name.errors && name.errors?.length > 0 && (
                <ul>
                  {name.errors?.map((error, index) => (
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
                name="username"
                placeholder="username"
                autoFocus={username.error ? true : undefined}
                required
              />
              <FormDescription id={password.descriptionId}>
                At least 4 characters
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
                name="password"
                placeholder="Enter password"
                autoComplete="current-password"
                autoFocus={password.error ? true : undefined}
                required
              />
              <FormDescription id={password.descriptionId}>
                At least 8 characters
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

            {/* <input hidden name="redirectTo" defaultValue={redirectTo} /> */}

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
          <SocialButton provider={AuthStrategies.GITHUB} label="GitHub" />
          <SocialButton provider={AuthStrategies.GOOGLE} label="Google" />
          <SocialButton provider={AuthStrategies.TWITTER} label="Twitter" />
        </section>
      </div>
    </div>
  )
}

interface SocialButtonProps {
  provider: AuthStrategy
  label: string
}

const SocialButton = ({ provider, label }: SocialButtonProps) => {
  let iconName = ""
  switch (provider) {
    case "github":
      iconName = "fe:github"
      break
    case "google":
      iconName = "fe:google"
      break
    case "twitter":
      iconName = "fe:twitter"
      break
    default:
      iconName = "fe:donut"
      break
  }

  return (
    <Form action={`/auth/${provider}`} method="post" className="flex">
      <Button size="sm" isIconText className="flex-[auto]">
        <Iconify icon={iconName} />
        <span>{label}</span>
      </Button>
    </Form>
  )
}
