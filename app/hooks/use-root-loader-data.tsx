import { useMatches } from "@remix-run/react"
import { useMemo } from "react"

import { type UserData, type UserSession } from "~/services/auth.server"
import { type parsedEnvClient } from "~/utils/env.server"

// Only the essentials
type RootLoaderData = {
  ENV: typeof parsedEnvClient
  userSession: UserSession | undefined
  userData: UserData | undefined
}

export function useMatchesData(routeId: string) {
  const matchingRoutes = useMatches()

  const route = useMemo(
    () => matchingRoutes.find(route => route.id === routeId),
    [matchingRoutes, routeId],
  )

  return route?.data
}

export function useRootLoaderData() {
  const data = useMatchesData("root") as RootLoaderData

  // Keep them optionals, because need to handle in error boundary
  return {
    ENV: data?.ENV,
    userSession: data?.userSession,
    userData: data?.userData,
  }
}
