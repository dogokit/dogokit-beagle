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

  /**
   * Custom query config, can be different for any cases
   */
  const where = !config.queryParam
    ? {}
    : {
        OR: [
          { fullname: { contains: config.queryParam } },
          { username: { contains: config.queryParam } },
        ],
      }

  /**
   * As searching and filtering might be complex,
   * use Prisma directly, it might be refactored later into the models
   */
  const [totalItems, users] = await prisma.$transaction([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      skip: config.skip,
      take: config.limitParam,
      include: {
        images: { select: { id: true, url: true } },
      },
    }),
  ])

  return json({ ...getPaginationOptions({ request, totalItems }), users })
}

export default function SearchRoute() {
  const { users, ...loaderData } = useLoaderData<typeof loader>()

  return (
    <div className="site-container space-y-10">
      <header className="site-header">
        <h1 className="inline-flex items-center gap-2 text-primary">
          <Iconify icon="ph:magnifying-glass" />
          <span>Search</span>
        </h1>
        <p>Demo of search and pagination</p>
      </header>

      <section className="site-section space-y-4">
        <PaginationSearch
          itemName="user"
          searchPlaceholder="Search users with keyword..."
          count={users.length}
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
        <PaginationNavigation {...loaderData} />
      </section>
    </div>
  )
}
