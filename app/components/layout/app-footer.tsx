import { ThemeMenu } from "~/components/shared/theme-menu"
import { useRootLoaderData } from "~/hooks/use-root-loader-data"

export function AppFooter() {
  const { ENV } = useRootLoaderData()

  return (
    <footer className="flex items-center justify-between gap-2 border-t border-t-border px-2 py-1">
      <div className="text-muted-foreground">
        <p className="text-xs">
          <span>Status: </span>
          <code>{ENV?.NODE_ENV}</code>
        </p>
      </div>

      <div>
        <ThemeMenu size="xs" />
      </div>
    </footer>
  )
}
