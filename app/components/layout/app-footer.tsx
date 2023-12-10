import { ThemeMenu } from "~/components/shared/theme-menu"
import { cn } from "~/utils/cn"

export function AppFooter() {
  return (
    <footer
      className={cn("fixed bottom-0 hidden w-full justify-start p-2 sm:flex")}
    >
      <ThemeMenu size="xs" />
    </footer>
  )
}
