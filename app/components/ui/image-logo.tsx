import { cva, type VariantProps } from "class-variance-authority"
import { Theme, useTheme } from "remix-themes"

import { configSite } from "~/configs/site"
import { cn } from "~/utils/cn"

const imageLogoVariants = cva("opacity-100", {
  variants: {
    size: {
      default: "w-52",
      lg: "w-80",
      xl: "w-96",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface ImageLogoProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof imageLogoVariants> {}

export function ImageLogo({ size, className }: ImageLogoProps) {
  const [theme] = useTheme()
  const imageUrl =
    theme === Theme.DARK ? configSite.logos.dark : configSite.logos.light

  return (
    <img
      src={imageUrl}
      alt="Logo"
      width={500}
      height={100}
      className={cn(imageLogoVariants({ size, className }))}
    />
  )
}
