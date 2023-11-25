import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
  PaginationSearch,
} from "~/components/shared/pagination"
import { PostItemLink } from "~/components/shared/post-item"
import { UserItemLink } from "~/components/shared/user-item"
import { Iconify } from "~/components/ui/iconify"
import { sanitizePosts } from "~/helpers/post"
import { prisma } from "~/libs/db.server"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap("/search", 0.8)

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
  const whereUser = {
    OR: [{ fullname: { contains } }, { username: { contains } }],
  }
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
  const [totalUsers, totalPosts, users, posts] = await prisma.$transaction([
    prisma.user.count({ where: whereUser }),
    prisma.post.count({ where: wherePost }),
    prisma.user.findMany({
      where: whereUser,
      skip: config.skip,
      take: config.limitParam,
      include: { images: { select: { url: true } } },
    }),
    prisma.post.findMany({
      where: wherePost,
      skip: config.skip,
      take: config.limitParam,
      include: { images: { select: { url: true } } },
    }),
  ])

  const totalItems = totalUsers + totalPosts

  return json({
    ...getPaginationOptions({ request, totalItems }),
    count: totalItems,
    users,
    posts: sanitizePosts(posts),
  })
}

export default function SearchRoute() {
  const { count, users, posts, ...loaderData } = useLoaderData<typeof loader>()

  return (
    <div className="site-container space-y-10">
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
          count={count}
          // Don't tell no result because this is search, blank by default
          isDefaultShow={false}
          {...loaderData}
        />
      </section>

      <section className="site-section">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {users.map(user => (
            <UserItemLink key={user.id} user={user as any} />
          ))}
        </ul>
      </section>

      <section className="site-section">
        <ul className="space-y-8">
          {posts.map(post => (
            <PostItemLink key={post.id} post={post as any} />
          ))}
        </ul>
      </section>

      <section className="site-section">
        <PaginationNavigation {...loaderData} />
      </section>
    </div>
  )
}
