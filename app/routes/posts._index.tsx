import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
  PaginationSearch,
} from "~/components/shared/pagination"
import { prisma } from "~/libs/db.server"
import { createMeta } from "~/utils/meta"

export const meta: MetaFunction = () =>
  createMeta({
    title: `Posts`,
    description: `Various posts`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const config = getPaginationConfigs({ request })

  /**
   * Custom query config, can be different for any cases
   */
  const where = !config.queryParam
    ? {}
    : {
        OR: [
          { title: { contains: config.queryParam } },
          { slug: { contains: config.queryParam } },
        ],
      }

  /**
   * As searching and filtering might be complex,
   * use Prisma directly, it might be refactored later into the models
   */
  const [totalItems, posts] = await prisma.$transaction([
    prisma.post.count({ where }),
    prisma.post.findMany({
      where,
      skip: config.skip,
      take: config.limitParam,
      include: {
        images: { select: { id: true, url: true } },
      },
    }),
  ])

  return json({ ...getPaginationOptions({ request, totalItems }), posts })
}

export default function SearchRoute() {
  const { posts, ...loaderData } = useLoaderData<typeof loader>()

  return (
    <div className="site-container space-y-10">
      <header className="site-header">
        <h1>Posts</h1>
        <h2>Various posts</h2>
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
        {posts.length > 0 && (
          <ul className="space-y-8">
            {posts.map(post => {
              return (
                <li key={post.id}>
                  <Link
                    to={`/posts/${post.slug}`}
                    className="block space-y-1 transition hover:opacity-75"
                  >
                    <h4>{post.title}</h4>
                    <p>{post.content}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>

      <section className="site-section">
        <PaginationNavigation {...loaderData} />
      </section>
    </div>
  )
}