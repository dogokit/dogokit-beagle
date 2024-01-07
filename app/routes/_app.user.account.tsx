import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import { FormDelete } from "~/components/shared/form-delete"
import { Button } from "~/components/ui/button"
import { requireUser } from "~/helpers/auth"
import { modelUser } from "~/models/user.server"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"
import { createTimer } from "~/utils/timer"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `User Account`,
    description: `Manage user account`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json(await requireUser(request))
}

export default function UserAccountRoute() {
  const { user } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h2>User Account</h2>
          <p>Configure user account</p>
        </div>
      </header>

      <section className="app-section max-w-md">
        <header>
          <h4>Delete Account</h4>
          <p className="text-sm">
            Deleting your account @{user.username} ({user.email}) along with all of your personal
            data cannot be restored.
          </p>
        </header>

        <FormDelete
          action="/user/account"
          intentValue="user-delete-account"
          itemText={`your account`}
          dialogTrigger={
            <Button size="sm" variant="destructive">
              Delete account
            </Button>
          }
        />
      </section>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const { userId } = await requireUser(request, ["ADMIN"])

  const timer = createTimer()
  const formData = await request.formData()
  const intent = formData.get("intent")?.toString()

  if (intent === "user-delete-account") {
    const deletedUser = await modelUser.deleteById({ id: userId })
    if (!deletedUser) return json({ message: "Failed to delete account" }, { status: 400 })
    await timer.delay()
    return redirect("/")
  }

  await timer.delay()
  return null
}
