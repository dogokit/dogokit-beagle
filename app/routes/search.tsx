import { json, type LoaderFunctionArgs } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"

import {
  getPaginationConfigs,
  getPaginationOptions,
  PaginationNavigation,
  PaginationSearch,
} from "~/components/shared/pagination"
import { AvatarAuto } from "~/components/ui/avatar-auto"
import { Iconify } from "~/components/ui/iconify"
import { prisma } from "~/libs/db.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const config = getPaginationConfigs({ request, defaultLimit: 10 })
  const contains = config.queryParam

  /**
   * Custom query config, can be different for any cases
   */
  const whereUser = !contains
    ? {}
    : { OR: [{ fullname: { contains } }, { username: { contains } }] }

  const wherePost = !contains
    ? {}
    : { OR: [{ slug: { contains } }, { title: { contains } }] }

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
    posts,
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
          isVerbose={true}
          {...loaderData}
        />

        <PaginationNavigation {...loaderData} />
      </section>

      <section className="site-section">
        {users.length > 0 && (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {users.map(user => {
              return (
                <li key={user.id}>
                  <Link
                    to={`/${user.username}`}
                    className="space-y-1 transition hover:opacity-75"
                  >
                    <AvatarAuto user={user} imageUrl={user.images[0]?.url} />
                    <h4>{user.fullname}</h4>
                    <p className="text-muted-foreground">@{user.username}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
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
