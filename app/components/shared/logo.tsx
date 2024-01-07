import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "~/utils/cn"

const logoVariants = cva("flex items-center gap-1 font-semibold", {
  variants: {
    variant: {
      default: "",
      link: "",
    },
    size: {
      default: "text-xl sm:text-2xl",
      lg: "gap-2 text-2xl sm:text-3xl",
      xl: "gap-2 text-3xl sm:text-4xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

const logoIconVariants = cva("", {
  variants: {
    size: {
      default: "size-6 sm:size-8",
      lg: "size-8 sm:size-10",
      xl: "size-10 sm:size-12",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

interface LogoProps extends React.HTMLAttributes<HTMLElement>, VariantProps<typeof logoVariants> {
  text?: string
  classNameIcon?: string
}

export function Logo({ variant, size, className, classNameIcon, text }: LogoProps) {
  const imageUrl = "/images/logos/dogokit-dog.svg"
  const altText = "Dog"

  return (
    <span className={cn(logoVariants({ variant, size, className }))}>
      <img
        src={imageUrl}
        alt={altText}
        className={cn(logoIconVariants({ size, className: classNameIcon }))}
        width={35}
        height={35}
      />
      <span className="inline-flex flex-nowrap font-display">{text}</span>
    </span>
  )
}
