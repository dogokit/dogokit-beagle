import { Toaster as Sonner, toast } from "sonner"

import { useTheme } from "~/components/shared/theme"

/**
 * Toast with Sonner
 *
 * Simpler than Toast Radix
 */

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme] = useTheme()
  const defaultTheme = theme ?? ""

  return (
    <Sonner
      theme={defaultTheme as ToasterProps["theme"]}
      // eslint-disable-next-line tailwindcss/no-custom-classname
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
