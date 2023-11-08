import { ThemeMenu } from "~/components/shared/theme-menu"

export function AppFooter() {
  return (
    <footer className="flex items-center justify-between gap-2 border-t border-t-border px-2 py-1">
      <div className="text-muted-foreground">
        <p className="text-xs">Status: OK</p>
      </div>

      <div>
        <ThemeMenu size="xs" />
      </div>
    </footer>
  )
}
