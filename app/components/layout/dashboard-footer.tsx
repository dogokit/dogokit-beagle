import { ThemeMenu } from "~/components/shared/theme-menu"

export function DashboardFooter() {
  return (
    <footer className="p-2">
      <div className="flex items-center justify-between gap-2">
        <ThemeMenu size="xs" />
      </div>
    </footer>
  )
}
