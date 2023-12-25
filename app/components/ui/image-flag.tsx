import { type Flags } from "flagpack-core"
import Flag from "react-flagpack"

import { configSite } from "~/configs/site"
import { cn } from "~/utils/cn"

interface ImageFlagProps {
  code: Flags
  size?: "S" | "M" | "L"
  gradient?: "" | "top-down" | "real-circular" | "real-linear"
  hasBorder?: boolean
  hasDropShadow?: boolean
  hasBorderRadius?: boolean
  className?: string
}

export function ImageFlag({
  code = (configSite.countryCode as Flags) || "US",
  size = "M",
  hasBorderRadius = true,
  className,
  ...props
}: ImageFlagProps) {
  return (
    <Flag
      code={code}
      size={size}
      hasBorderRadius={hasBorderRadius}
      className={cn(className)}
      {...props}
    />
  )
}
