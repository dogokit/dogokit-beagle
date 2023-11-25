import { ThemeMenu } from "~/components/shared/theme-menu"
import { configSite } from "~/configs/site"
import { getCurrentYear } from "~/utils/datetime"

export function SiteFooter() {
  return (
    <footer className="mt-20 p-2 sm:p-4">
      <div className="flex items-center justify-between gap-2 rounded-md bg-secondary px-4 py-8">
        <p>
          &copy; {getCurrentYear()} {configSite.name}. All rights reserved.
        </p>
        <ThemeMenu />
      </div>
    </footer>
  )
}
