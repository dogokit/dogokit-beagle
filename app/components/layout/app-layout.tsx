import { AppFooter } from "~/components/layout/app-footer"
import { AppNavigation } from "~/components/layout/app-navigation"
import { cn } from "~/utils/cn"

export function AppLayout({
  className,
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex min-h-screen flex-col">
      <AppNavigation />

      <main className={cn("flex-1", className)}>{children}</main>

      <AppFooter />
    </div>
  )
}
