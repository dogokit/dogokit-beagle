import { ButtonLink } from "~/components/ui/button-link"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"

export function IndicatorNoUser() {
  const { userData } = useRootLoaderData()

  if (!userData) return null

  return (
    <div className="flex items-center gap-2">
      <ButtonLink to="/login" variant="secondary">
        Log In
      </ButtonLink>
      <ButtonLink to="/signup">Sign Up</ButtonLink>
    </div>
  )
}

export function IndicatorUser() {
  const { userData } = useRootLoaderData()

  if (!userData) return null

  return (
    <div className="flex items-center gap-2">
      <ButtonLink to="/logout" variant="destructive">
        Log out
      </ButtonLink>
      <ButtonLink to="/dashboard" prefetch="intent">
        Dashboard
      </ButtonLink>
    </div>
  )
}
