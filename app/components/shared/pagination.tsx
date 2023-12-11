/**
 * Paginated Search Components
 *
 * See example at app/routes/search.tsx
 */

import { Link, useLocation } from "@remix-run/react"

import { FormSearch } from "~/components/shared/form-search"
import { Iconify } from "~/components/ui/iconify"
import { cn } from "~/utils/cn"
import { pluralizeWord } from "~/utils/string"

const DEFAULT_LIMIT = 4
const DEFAULT_PAGE = 1

interface PaginationItem {
  pageNumber: number
  to: string
}

interface PaginationConfigs {
  request: Request
  defaultLimit?: number
  defaultPage?: number
}

interface PaginationOptionsConfig {
  request: Request
  totalItems: number
  defaultMaxPageItems?: number
}

interface CommonPaginationProps {
  queryParam: string
  pageParam: number
  totalItems: number
  totalPages: number
}

interface PaginationNavigationProps extends CommonPaginationProps {
  limitParam: number
  paginationItems: PaginationItem[]
}

interface PaginationSearchProps extends CommonPaginationProps {
  itemName?: string
  searchPlaceholder?: string
  count: number
  isVerbose?: boolean
  isDefaultShow?: boolean
}

export function getPaginationConfigs({
  request,
  defaultLimit = DEFAULT_LIMIT,
  defaultPage = DEFAULT_PAGE,
}: PaginationConfigs) {
  const url = new URL(request.url)

  const queryParam = url.searchParams.get("q") ?? ""
  const limitParam = Number(url.searchParams.get("limit")) || defaultLimit
  const pageParam = Number(url.searchParams.get("page")) || defaultPage
  const skip = (pageParam - 1) * limitParam

  return { request, queryParam, limitParam, pageParam, skip }
}

export function getPaginationOptions({
  request,
  totalItems,
  defaultMaxPageItems = DEFAULT_LIMIT,
}: PaginationOptionsConfig) {
  const url = new URL(request.url)
  const { queryParam, limitParam, pageParam } = getPaginationConfigs({
    request,
    defaultLimit: defaultMaxPageItems,
  })

  const totalPages = Math.ceil(totalItems / limitParam)
  const visiblePageCount = Math.min(defaultMaxPageItems, totalPages)

  let startPage = Math.max(1, pageParam - Math.floor(visiblePageCount / 2))
  let endPage = Math.min(totalPages, startPage + visiblePageCount - 1)

  if (endPage - startPage + 1 < visiblePageCount) {
    startPage = Math.max(1, endPage - visiblePageCount + 1)
  }

  const paginationItems: PaginationItem[] = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => {
      const pageNumber = startPage + index
      const queryParams = new URLSearchParams({
        q: queryParam,
        limit: limitParam.toString() || "",
        page: pageNumber.toString() || "",
      }).toString()
      return { pageNumber, to: `${url.pathname}?${queryParams}` }
    },
  )

  return {
    queryParam,
    limitParam,
    pageParam,
    totalItems,
    totalPages,
    paginationItems,
  }
}

export function PaginationNavigation({
  queryParam,
  limitParam,
  pageParam,
  totalPages,
  paginationItems,
}: PaginationNavigationProps) {
  const location = useLocation()

  function renderArrowLink(
    direction: string,
    icon: React.ReactNode,
    targetPage: number,
  ) {
    const isPrev = direction === "prev"
    const isNext = direction === "next"
    const isFirst = direction === "first"
    const isLast = direction === "last"

    const newPage = isPrev ? pageParam - 1 : isNext ? pageParam + 1 : targetPage
    const isPossible =
      (isFirst && pageParam !== 1) ||
      (isLast && pageParam !== totalPages) ||
      (!isFirst && !isLast && pageParam === newPage) ||
      (isPrev && pageParam > 1) ||
      (isNext && pageParam < totalPages)

    if (!isPossible) {
      return (
        <span className="flex w-8 select-none justify-center rounded-md p-2 opacity-20">
          {icon}
        </span>
      )
    }

    const searchParams = new URLSearchParams({
      q: queryParam,
      limit: String(limitParam),
      page: String(targetPage),
    }).toString()

    return (
      <Link
        to={`${location.pathname}?${searchParams}`}
        className="focus-ring flex w-8 justify-center rounded-md p-2 text-muted-foreground transition hover:bg-secondary hover:opacity-75"
      >
        {icon}
      </Link>
    )
  }

  function renderArrowMostLink(
    direction: "first" | "last",
    icon: React.ReactNode,
  ) {
    const targetPage = direction === "first" ? 1 : totalPages
    return renderArrowLink(direction, icon, targetPage)
  }

  // Don't render if there's no items to paginate
  if (paginationItems.length <= 0) return null

  return (
    <nav className="flex items-center justify-center gap-4">
      {renderArrowMostLink("first", <Iconify icon="ph:caret-double-left" />)}
      {renderArrowLink("prev", <Iconify icon="ph:caret-left" />, pageParam - 1)}

      {pageParam > 0 && (
        <ul className="flex flex-wrap gap-4">
          {paginationItems.map(({ pageNumber, to }, index) => {
            const isActive = pageParam === pageNumber
            return (
              <li key={index}>
                <Link
                  to={to}
                  className={cn(
                    // Use width to have consistent width although different numbers
                    "focus-ring flex w-8 justify-center rounded-md p-1 transition hover:opacity-75",
                    isActive && "bg-secondary text-primary",
                    !isActive && "text-muted-foreground hover:bg-secondary",
                  )}
                >
                  {pageNumber}
                </Link>
              </li>
            )
          })}
        </ul>
      )}

      {renderArrowLink(
        "next",
        <Iconify icon="ph:caret-right" />,
        pageParam + 1,
      )}
      {renderArrowMostLink("last", <Iconify icon="ph:caret-double-right" />)}
    </nav>
  )
}

export function PaginationSearch({
  itemName = "item",
  searchPlaceholder = "Search with keyword...",
  count,
  queryParam,
  pageParam,
  totalItems,
  totalPages,
  isVerbose = false,
  isDefaultShow = true,
}: PaginationSearchProps) {
  const location = useLocation()
  const pluralItemsText = pluralizeWord(itemName, count)

  return (
    <section className="w-full space-y-2">
      <FormSearch action={location.pathname} placeholder={searchPlaceholder} />

      <div className="w-full space-y-2 text-sm">
        {/* Not found anything from search */}
        {!queryParam && count <= 0 && isDefaultShow && (
          <p className="text-muted-foreground">No {itemName} found</p>
        )}

        {/* Not found anything from search */}
        {queryParam && count <= 0 && (
          <p className="text-muted-foreground">
            No {itemName} found with keyword "{queryParam}"
          </p>
        )}

        {/* Without search query keyword */}
        {!queryParam && count > 0 && (
          <p className="space-x-2 text-muted-foreground">
            <span>
              {pluralItemsText} in page {pageParam}
            </span>

            {isVerbose && (
              <span className="text-muted-foreground/50">
                (from total of {pluralizeWord(itemName, totalItems)} in{" "}
                {pluralizeWord("page", totalPages)})
              </span>
            )}
          </p>
        )}

        {/* With search query keyword */}
        {queryParam && count > 0 && (
          <p className="space-x-2 text-muted-foreground">
            <span>
              "{queryParam}" found {pluralItemsText} in page {pageParam}
            </span>
            {isVerbose && (
              <span>
                (from total of {pluralizeWord(itemName, totalItems)} in{" "}
                {pluralizeWord("page", totalPages)})
              </span>
            )}
          </p>
        )}
      </div>
    </section>
  )
}
