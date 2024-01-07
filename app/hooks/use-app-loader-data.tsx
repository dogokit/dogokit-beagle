import { type PageStatus, type PostStatus } from "@prisma/client"

import { useMatchesData } from "~/hooks/use-root-loader-data"

export function useAppUserLoaderData() {
  const appUserData = useMatchesData("routes/_app.user") as {
    postStatuses: PostStatus[]
  }

  return {
    postStatuses: appUserData?.postStatuses,
  }
}

export function useAppAdminLoaderData() {
  const appAdminData = useMatchesData("routes/_app.admin") as {
    pageStatuses: PageStatus[]
    postStatuses: PostStatus[]
  }

  return {
    pageStatuses: appAdminData?.pageStatuses,
    postStatuses: appAdminData?.postStatuses,
  }
}
