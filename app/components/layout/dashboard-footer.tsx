import { ThemeMenu } from "~/components/shared/theme-menu"

export function DashboardFooter() {
  return (
    <footer className="bg-secondary p-2">
      <div className="flex items-center justify-between gap-2">
        <ThemeMenu size="sm" />
      </div>
    </footer>
  )
}
