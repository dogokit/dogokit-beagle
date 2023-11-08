import { ThemeMenu } from "~/components/shared/theme-menu"
import { getCurrentYear } from "~/utils/datetime"

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-muted px-4 py-8">
      <div className="flex items-center justify-between gap-2">
        <p>{getCurrentYear()} &copy; Dogokit Remix</p>
        <ThemeMenu />
      </div>
    </footer>
  )
}
