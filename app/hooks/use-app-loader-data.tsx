import { type PostStatus } from "@prisma/client"

import { useMatchesData } from "~/hooks/use-root-loader-data"

export function useAppUserLoaderData() {
  const appUserData = useMatchesData("routes/user") as {
    postStatuses: PostStatus[]
  }

  return {
    postStatuses: appUserData?.postStatuses,
  }
}

export function useAppAdminLoaderData() {
  const appAdminData = useMatchesData("routes/admin") as {
    postStatuses: PostStatus[]
  }

  return {
    postStatuses: appAdminData?.postStatuses,
  }
}
