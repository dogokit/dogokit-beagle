import { cn } from "~/utils/cn"

export function SectionOr({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("flex flex-col", className)}>
      <hr className="h-0 border-t" />
      <div className="-mt-2 text-center text-xs">
        <span className="bg-background px-2 text-muted-foreground">OR</span>
      </div>
    </section>
  )
}
