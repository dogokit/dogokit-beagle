import { json, type LoaderFunctionArgs, type MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
  PaginationSearch,
} from "~/components/shared/pagination-search"
import { PostItem } from "~/components/shared/post-item"
import { db } from "~/libs/db.server"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction<typeof loader> = () =>
  createMeta({
    title: `Posts`,
    description: `Various posts`,
    canonicalPath: "/posts",
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const config = getPaginationConfigs({ request })
  const contains = config.queryParam

  /**
   * Custom query config, can be different for any cases
   * This show the 1st page result even if there's no query
   */
  const where = !contains
    ? {
        status: {
          OR: [{ symbol: "PUBLISHED" }, { symbol: "ARCHIVED" }],
        },
      }
    : {
        OR: [{ title: { contains } }, { slug: { contains } }],
        status: {
          OR: [{ symbol: "PUBLISHED" }, { symbol: "ARCHIVED" }],
        },
      }

  /**
   * As searching and filtering might be complex,
   * use Prisma directly, it might be refactored later into the models
   */
  const [totalItems, posts] = await db.$transaction([
    db.post.count({ where }),
    db.post.findMany({
      where,
      skip: config.skip,
      take: config.limitParam,
      orderBy: { updatedAt: "desc" },
      include: {
        status: { select: { symbol: true, name: true } },
        images: { select: { id: true, url: true } },
        user: { include: { images: { select: { id: true, url: true } } } },
      },
    }),
  ])

  return json({
    ...getPaginationOptions({ request, totalItems }),
    posts,
  })
}

/**
 * EDITME: This can be renamed to be a blog route
 * _site.posts._index > _site.blog._index
 * Alongside with other _site.posts route
 */

export default function PostsRoute() {
  const { posts, ...loaderData } = useLoaderData<typeof loader>()

  return (
    <div className="site-container space-y-12">
      <header className="site-header">
        <h1>Posts</h1>
      </header>

      <section className="site-section">
        <PaginationSearch
          itemName="post"
          searchPlaceholder="Search posts with keyword..."
          count={posts.length}
          {...loaderData}
        />
      </section>

      <section className="site-section">
        <ul className="space-y-12">
          {posts.map(post => (
            <li key={post.id}>
              <PostItem post={post} />
            </li>
          ))}
        </ul>
      </section>

      <section className="site-section">
        <PaginationNavigation {...loaderData} />
      </section>
    </div>
  )
}
