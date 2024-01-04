import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData, type Params } from "@remix-run/react"
import { z } from "zod"
import { zx } from "zodix"

import {
  ErrorHelpInformation,
  GeneralErrorBoundary,
} from "~/components/shared/error-boundary"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { ButtonLink } from "~/components/ui/button-link"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"
import { modelPost } from "~/models/post.server"
import { modelUser } from "~/models/user.server"
import { invariant, invariantResponse } from "~/utils/invariant"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

/**
 * $username splat route can check for:
 * 1. User from database
 * 2. Organization from database
 * 3. If nothing found, tell this user doesn’t exist
 */
export async function loader({ params }: LoaderFunctionArgs) {
  const { param } = zx.parseParams(params, { param: z.string() })
  invariant(param, "param unavailable")

  const page = await modelPost.getBySlug({ slug: param })
  const user = await modelUser.getByUsername({ username: param })

  if (page) return json({ page, user: null })
  if (user) return json({ page: null, user })

  return json({ page: null, user: null }, { status: 404 })
}

export const meta: MetaFunction<typeof loader> = ({ params, data }) => {
  const page = data?.page
  const user = data?.user

  if (page) {
    return createMeta({
      title: page.title,
      description: page.title,
    })
  }

  if (user) {
    return createMeta({
      title: `${user.fullname} (@${user.username})`,
      description: user.profiles[0]?.bio ?? "",
    })
  }

  return createMeta({
    title: "Page or user profile is not found",
    description: `Cannot find page or user "${params.param}"`,
  })
}

export default function ParamRoute() {
  const { userSession } = useRootLoaderData()
  const { page, user } = useLoaderData<typeof loader>()

  if (page && !user) {
    return (
      <div className="site-container space-y-8">
        <h1>{page.title}</h1>
      </div>
    )
  }

  if (!page && user) {
    const profile = user.profiles[0]
    const isOwner = user.id === userSession?.id

    return (
      <div className="site-container space-y-8">
        <section className="site-section my-4 space-y-2">
          <div className="flex flex-wrap items-end justify-between">
            <AvatarAuto
              user={user}
              imageUrl={user.images[0]?.url}
              className="outline outline-2 outline-background"
              size="xl"
            />
            {isOwner && (
              <ButtonLink to="/user/settings" variant="outline" size="sm">
                Edit profile
              </ButtonLink>
            )}
          </div>

          <div>
            <h2 className="text-3xl">{user.fullname}</h2>
            <h3 className="text-2xl text-muted-foreground">@{user.username}</h3>
          </div>
        </section>

        {profile && (
          <section className="site-section space-y-2">
            <h4>{profile.headline}</h4>
            <p className="prose-config">{profile.bio}</p>
          </section>
        )}
      </div>
    )
  }

  return (
    <div className="site-container">
      <section className="site-section prose-config">
        <h1>Sorry, this page or user could not be found</h1>
        <p>
          The requested page or user either doesn’t exist or you don’t have
          access to it.
        </p>
      </section>
      <ErrorHelpInformation />
    </div>
  )
}
