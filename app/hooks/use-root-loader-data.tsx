import { useMatches } from "@remix-run/react"
import { useMemo } from "react"

import { type UserData, type UserSession } from "~/services/auth.server"

export type RootLoaderData = {
  ENV: any
  NODE_ENV: string
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

  return {
    ENV: data?.ENV,
    NODE_ENV: data?.NODE_ENV,
    userSession: data?.userSession,
    userData: data?.userData,
  }
}
