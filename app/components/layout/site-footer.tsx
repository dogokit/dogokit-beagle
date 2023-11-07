import { ThemeMenu } from "~/components/shared/theme-menu"

export function SiteFooter() {
  const date = new Date()
  const year = date.getFullYear()

  return (
    <footer className="mt-20 bg-secondary px-4 py-8">
      <div className="flex items-center justify-between gap-2">
        <p>{year} &copy; Dogokit Remix</p>
        <ThemeMenu />
      </div>
    </footer>
  )
}
