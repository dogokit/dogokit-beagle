import { Icon } from "@iconify/react"
import { type VariantProps } from "class-variance-authority"
import { Theme, useTheme } from "remix-themes"
import { match } from "ts-pattern"

import { type buttonVariants } from "~/components/ui/button"
import { ButtonIcon } from "~/components/ui/button-icon"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { useMediaQuery } from "~/hooks/use-media-query"

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)"

interface ThemeMenuProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  align?: "center" | "start" | "end" | undefined
}

// not in components because it depens on the theme config
export function ThemeMenu({ align = "end", size }: ThemeMenuProps) {
  const [, setTheme] = useTheme()
  const isPreferDark = useMediaQuery(COLOR_SCHEME_QUERY)

  function handleChangeTheme(themeName: "dark" | "light" | "system") {
    const selectedTheme = match(themeName)
      .with("dark", () => Theme.DARK)
      .with("light", () => Theme.LIGHT)
      .otherwise(() => (isPreferDark ? Theme.DARK : Theme.LIGHT))

    setTheme(selectedTheme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonIcon variant="ghost" size={size}>
          <Icon
            icon="ph:sun-duotone"
            className="rotate-0 scale-100 transition-transform dark:-rotate-180 dark:scale-0"
          />
          <Icon
            icon="ph:moon-duotone"
            className="absolute rotate-180 scale-0 transition-transform dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle color mode theme</span>
        </ButtonIcon>
      </DropdownMenuTrigger>

      <DropdownMenuContent align={align}>
        <DropdownMenuItem onClick={() => handleChangeTheme("light")}>
          <Icon icon="ph:sun-duotone" className="me-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeTheme("dark")}>
          <Icon icon="ph:moon-duotone" className="me-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleChangeTheme("system")}>
          <Icon icon="ph:laptop-duotone" className="me-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
