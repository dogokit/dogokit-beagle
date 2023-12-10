import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
  PaginationSearch,
} from "~/components/shared/pagination"
import { PostItem } from "~/components/shared/post-item"
import { Iconify } from "~/components/ui/iconify"
import { prisma } from "~/libs/db.server"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap("/search", 0.8)

export const meta: MetaFunction = () =>
  createMeta({
    title: "Search",
    description: "Search some data.",
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const config = getPaginationConfigs({ request, defaultLimit: 10 })
  const contains = config.queryParam

  /**
   * Only in a search-first page, proceed if there's a query
   */
  if (!contains) {
    return json({
      ...getPaginationOptions({ request, totalItems: 0 }),
      count: 0,
      users: [],
      posts: [],
    })
  }

  /**
   * Custom query config, can be different for any cases
   */
  const wherePost = {
    OR: [{ slug: { contains } }, { title: { contains } }],
    status: {
      OR: [{ symbol: "PUBLISHED" }, { symbol: "ARCHIVED" }],
    },
  }

  /**
   * As searching and filtering might be complex,
   * use Prisma directly, it might be refactored later into the models
   */
  const [totalItems, posts] = await prisma.$transaction([
    prisma.post.count({ where: wherePost }),
    prisma.post.findMany({
      where: wherePost,
      skip: config.skip,
      take: config.limitParam,
      orderBy: { updatedAt: "desc" },
      include: {
        images: { select: { url: true } },
        user: { include: { images: { select: { id: true, url: true } } } },
      },
    }),
  ])

  return json({
    ...getPaginationOptions({ request, totalItems }),
    posts,
  })
}

export default function SearchRoute() {
  const { posts, ...loaderData } = useLoaderData<typeof loader>()

  return (
    <div className="site-container space-y-12">
      <header className="site-header">
        <h1 className="inline-flex items-center gap-2 text-primary">
          <Iconify icon="ph:magnifying-glass" />
          <span>Search</span>
        </h1>
      </header>

      <section className="site-section space-y-4">
        <PaginationSearch
          itemName="result"
          searchPlaceholder="Search users and notes..."
          count={posts.length}
          {...loaderData}
          isDefaultShow={false} // Search is blank by default
        />
      </section>

      <section className="site-section">
        <ul className="space-y-12">
          {posts.map(post => (
            <li key={post.id}>
              <PostItem post={post as any} />
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
