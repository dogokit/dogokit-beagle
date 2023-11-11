import { useSearchParams } from "@remix-run/react"

import { useRootLoaderData } from "~/hooks/use-root-loader-data"

export function useAppMode(mode?: string) {
  const isModeEdit = mode === "edit"

  const { NODE_ENV } = useRootLoaderData()
  const [searchParams] = useSearchParams()
  const paramsMode = searchParams.get("mode")
  const isModeDevelopment = NODE_ENV === "development" || paramsMode === "dev"

  return {
    mode: paramsMode || mode,
    isModeEdit,
    isModeDevelopment,
  }
}
