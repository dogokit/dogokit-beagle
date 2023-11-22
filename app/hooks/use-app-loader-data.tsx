import { type Prisma } from "@prisma/client"
import { type modelPostStatus } from "~/models/post-status.server"

import { useMatchesData } from "~/hooks/use-root-loader-data"

export function useAppUserLoaderData() {
  const appUserData = useMatchesData("routes/user") as {
    postStatuses: Prisma.PromiseReturnType<typeof modelPostStatus.getAll>
  }

  return {
    postStatuses: appUserData?.postStatuses,
  }
}

export function useAppAdminLoaderData() {
  const appAdminData = useMatchesData("routes/admin") as {
    postStatuses: Prisma.PromiseReturnType<typeof modelPostStatus.getAll>
  }

  return {
    postStatuses: appAdminData?.postStatuses,
  }
}
