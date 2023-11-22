import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { BadgeStatus } from "~/components/shared/badge-status"
import { FormDelete } from "~/components/shared/form-delete"

import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
  PaginationSearch,
} from "~/components/shared/pagination"
import { ButtonLink } from "~/components/ui/button-link"
import { Iconify } from "~/components/ui/iconify"
import { requireUser } from "~/helpers/auth"
import { prisma } from "~/libs/db.server"
import { cn } from "~/utils/cn"
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
  const { userId } = await requireUser(request)

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
        status: { select: { symbol: true, name: true } },
        images: { select: { url: true } },
      },
    }),
  ])

  return json({
    userId,
    posts,
    ...getPaginationOptions({ request, totalItems }),
  })
}

export default function UserPostsRoute() {
  const { userId, posts, ...loaderData } = useLoaderData<typeof loader>()

  return (
    <div className="app-container">
      <header className="app-header flex justify-between gap-4">
        <h2>Posts</h2>
        <div>
          <FormDelete
            action="/user/posts/delete"
            intentValue="user-delete-all-posts"
            itemText="all posts"
            buttonText="Delete all posts"
            requireUser
            userId={userId}
            disabled={posts.length <= 0}
          />
        </div>
      </header>

      <section className="app-section">
        <PaginationSearch
          itemName="post"
          searchPlaceholder="Search posts with keyword..."
          count={posts.length}
          {...loaderData}
        />
      </section>

      <section className="app-section">
        {posts.length > 0 && (
          <ul className="divide-y">
            {posts.map(post => {
              const isDisabled = post.status.symbol === "DRAFT"
              // Can view owned post if PRIVATE, UNLISTED, PUBLISHED, ARCHIVED

              return (
                <li
                  key={post.id}
                  className={cn(
                    "py-2",
                    "flex flex-col flex-wrap gap-1",
                    "lg:flex-row lg:items-center lg:justify-between lg:gap-2",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <ButtonLink
                        variant="outline"
                        size="xs"
                        to={`/user/posts/${post.id}`}
                      >
                        <Iconify icon="ph:note-pencil" />
                        <span>Edit</span>
                      </ButtonLink>
                      <FormDelete
                        action="/user/posts/delete"
                        intentValue="user-delete-post-by-id"
                        itemText={`a post: ${post.title} (${post.slug})`}
                        defaultValue={post.id}
                        requireUser
                        userId={post.userId}
                      />
                      <ButtonLink
                        variant="outline"
                        size="xs"
                        to={`/posts/${post.slug}`}
                        disabled={isDisabled}
                      >
                        <Iconify icon="ph:arrow-square-out-duotone" />
                        <span>View</span>
                      </ButtonLink>
                    </div>
                    <h4>{post.title}</h4>
                  </div>

                  <div className="flex items-center gap-2">
                    <code className="text-xs text-muted-foreground">
                      {post.slug}
                    </code>

                    <BadgeStatus status={post.status} />
                  </div>
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
