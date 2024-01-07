import { Iconify } from "~/components/libs/iconify"
import { FormDelete } from "~/components/shared/form-delete"
import { FormUpdateStatus } from "~/components/shared/form-update-status"
import { ButtonLink } from "~/components/ui/button-link"
import { useAppAdminLoaderData } from "~/hooks/use-app-loader-data"
import { type modelPage } from "~/models/page.server"
import { type JsonifyPrisma } from "~/types/jsonify"
import { cn } from "~/utils/cn"
import { truncateText } from "~/utils/string"

export function PageItemAction({
  page,
}: {
  page: JsonifyPrisma<typeof modelPage.getWithStatus>
}) {
  const { pageStatuses } = useAppAdminLoaderData()
  if (!page) return null

  // Only can View page if PRIVATE, UNLISTED, PUBLISHED, ARCHIVED
  const isViewDisabled = page.status.symbol === "DRAFT"

  return (
    <li
      key={page.id}
      className={cn(
        "flex flex-col flex-wrap items-start justify-between gap-1 py-2",
        "sm:flex-row",
        "lg:items-center lg:gap-2",
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "flex flex-col gap-1",
            "lg:flex-row-reverse lg:items-center",
          )}
        >
          <h4>{truncateText(page.title)}</h4>

          <div className="space-x-1">
            <ButtonLink
              variant="outline"
              size="xs"
              to={`/admin/pages/${page.id}`}
            >
              <Iconify icon="ph:note-pencil" />
              <span>Edit</span>
            </ButtonLink>
            <FormDelete
              action="/admin/pages/delete"
              intentValue="admin-delete-page-by-id"
              itemText={`a page: ${page.title} (${page.slug})`}
              defaultValue={page.id}
            />
            <ButtonLink
              variant="outline"
              size="xs"
              to={`/${page.slug}`}
              disabled={isViewDisabled}
            >
              <Iconify icon="ph:arrow-square-out-duotone" />
              <span>View</span>
            </ButtonLink>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 lg:flex-row-reverse">
        <FormUpdateStatus
          itemId="pageId"
          action="/admin/pages/update"
          intentValue="update-page-status"
          dialogTitle="Update page's status"
          dialogDescription={`Update the status of page: ${page.title} (${page.slug})`}
          buttonText="Update Status"
          itemStatuses={pageStatuses}
          item={page}
        />

        <code className="hidden text-xs text-muted-foreground lg:inline-flex">
          {page.slug}
        </code>
      </div>
    </li>
  )
}
