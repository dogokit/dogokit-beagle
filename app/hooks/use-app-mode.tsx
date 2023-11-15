import { useSearchParams } from "@remix-run/react"

import { useRootLoaderData } from "~/hooks/use-root-loader-data"

export function useAppMode(mode?: string) {
  const { ENV } = useRootLoaderData()
  const [searchParams] = useSearchParams()
  const paramsMode = searchParams.get("mode")

  return {
    mode: paramsMode || mode,
    isModeEdit: mode === "edit",
    isModeDevelopment:
      ENV?.NODE_ENV === "development" || searchParams.get("mode") === "dev",
  }
}
