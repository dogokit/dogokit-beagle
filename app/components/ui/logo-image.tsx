import { cva, type VariantProps } from "class-variance-authority"
import { Theme, useTheme } from "remix-themes"

import { cn } from "~/utils/cn"

const logoImageVariants = cva("", {
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

interface LogoImageProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof logoImageVariants> {}

export function LogoImage({ size, className }: LogoImageProps) {
  const [theme] = useTheme()
  const imageUrl =
    theme === Theme.DARK
      ? "/images/logos/svg/dogokit-white.svg"
      : "/images/logos/svg/dogokit-black.svg"

  return (
    <img
      src={imageUrl}
      alt="Dogokit Logo"
      width={500}
      height={100}
      className={cn(logoImageVariants({ size, className }))}
    />
  )
}
