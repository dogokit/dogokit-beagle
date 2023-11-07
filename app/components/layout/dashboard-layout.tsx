import { DashboardFooter } from "~/components/layout/dashboard-footer"
import { DashboardNavigation } from "~/components/layout/dashboard-navigation"
import { cn } from "~/utils/cn"

export function DashboardLayout({
  className,
  children,
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="flex min-h-screen flex-col">
      <DashboardNavigation />

      <main className={cn("flex-[1]", className)}>{children}</main>

      <DashboardFooter />
    </div>
  )
}
