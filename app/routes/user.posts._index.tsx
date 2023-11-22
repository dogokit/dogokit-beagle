import {
  json,
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
import { PostListItem } from "~/components/shared/post-list-item"
import { requireUser } from "~/helpers/auth"
import { prisma } from "~/libs/db.server"
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
              return <PostListItem key={post.id} post={post as any} />
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
