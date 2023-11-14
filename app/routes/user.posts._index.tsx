import { parse } from "@conform-to/zod"
import {
  json,
  redirect,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { FormDelete } from "~/components/shared/form-delete"

import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
  PaginationSearch,
} from "~/components/shared/pagination"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { requireUserId } from "~/helpers/auth"
import { prisma } from "~/libs/db.server"
import { modelUserPost } from "~/models/user-post.server"
import { schemaPostDelete } from "~/schemas/post"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `User Posts`,
    description: `Manage user posts`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const config = getPaginationConfigs({ request })
  const userId = await requireUserId(request)

  const where = !config.queryParam
    ? { userId }
    : {
        AND: [{ userId }],
        OR: [
          { title: { contains: config.queryParam } },
          { slug: { contains: config.queryParam } },
        ],
      }

  const [totalItems, posts] = await prisma.$transaction([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      skip: config.skip,
      take: config.limitParam,
      include: {
        images: { select: { url: true } },
      },
    }),
  ])

  return json({ ...getPaginationOptions({ request, totalItems }), posts })
}

export default function UserPostsRoute() {
  const { posts, ...loaderData } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>Posts</h2>
        <PaginationSearch
          itemName="post"
          searchPlaceholder="Search posts with keyword..."
          count={posts.length}
          {...loaderData}
        />
      </header>

      <section className="app-section">
        {posts.length > 0 && (
          <ul className="space-y-4">
            {posts.map(post => {
              return (
                <li key={post.id} className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2">
                    <ButtonLink
                      variant="outline"
                      size="xs"
                      to={`/user/posts/${post.id}`}
                    >
                      <Iconify icon="ph:note-pencil" />
                      <span>Edit</span>
                    </ButtonLink>
                    <FormDelete
                      itemText={`a post: ${post.title} (${post.slug})`}
                      defaultValue={post.id}
                      extraComponent={
                        <input
                          type="hidden"
                          name="userId"
                          defaultValue={post.userId}
                        />
                      }
                    />
                    <ButtonLink
                      variant="outline"
                      size="xs"
                      to={`/posts/${post.slug}`}
                    >
                      <Iconify icon="ph:arrow-square-out-duotone" />
                      <span>View</span>
                    </ButtonLink>
                  </div>

                  <h4>{post.title}</h4>

                  <code className="text-xs text-muted-foreground">
                    {post.slug}
                  </code>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section className="app-section">
        <PaginationNavigation {...loaderData} />
      </section>
    </div>
  )
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const submission = parse(formData, { schema: schemaPostDelete })
  if (!submission.value || submission.intent !== "submit") {
    return json(submission)
  }
  if (submission.payload.intent === "delete-by-id") {
    await modelUserPost.deleteById(submission.value)
    return redirect(`/user/posts`)
  }
  return json(submission)
}
