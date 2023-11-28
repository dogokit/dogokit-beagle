import { parse } from "@conform-to/zod"
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useActionData, useLoaderData } from "@remix-run/react"

import { FormUserUsername } from "~/components/shared/form-user-username"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { configUnallowedKeywords } from "~/configs/unallowed-keywords"
import { requireUser } from "~/helpers/auth"
import { modelUser } from "~/models/user.server"
import { schemaGeneralId } from "~/schemas/general"
import { issueUsernameUnallowed, schemaUserUsername } from "~/schemas/user"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"
import { debugCode } from "~/utils/string.server"
import { createTimer } from "~/utils/timer"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `User Settings`,
    description: `Manage user account settings`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json(await requireUser(request))
}

export default function UserSettingsRoute() {
  const { user } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  return (
    <div className="app-container">
      <header className="app-header items-center gap-4">
        <AvatarAuto user={user} imageUrl={user.images[0]?.url} />

        <div>
          <h2>User Settings</h2>
          <p>Manage user settings and profile</p>
        </div>
      </header>

      <section className="app-section max-w-md">
        <FormUserUsername user={user} submission={actionData?.submission} />
      </section>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const timer = createTimer()
  const formData = await request.formData()
  const submission = parse(formData, { schema: schemaGeneralId })
  const intent = submission.value?.intent

  if (intent === "user-update-username") {
    const submission = parse(formData, {
      schema: schemaUserUsername.superRefine((data, ctx) => {
        const unallowedUsername = configUnallowedKeywords.find(
          keyword => keyword === data.username,
        )
        if (unallowedUsername) {
          ctx.addIssue(issueUsernameUnallowed)
          return
        }
      }),
    })

    debugCode(submission)

    if (!submission.value || submission.intent !== "submit") {
      await timer.delay()
      return json({ status: "error", submission }, { status: 400 })
    }

    await modelUser.updateUsername(submission.value)
    await timer.delay()
    return json({ status: "success", submission }, { status: 200 })
  }

  await timer.delay()
  return json({ submission })
}
