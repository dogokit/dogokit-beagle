import { cn } from "~/utils/cn"

export function ImageCover({
  src,
  alt,
  className,
  width = 200,
  height = 150,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const sourceWidth = Number(width) * 2
  const sourceHeight = Number(height) * 2
  const placeholder = `https://picsum.photos/${sourceWidth}/${sourceHeight}`

  return (
    <img
      src={src || placeholder}
      alt={alt}
      className={cn(
        "w-full select-none rounded-md bg-secondary object-cover",
        className,
      )}
      width={width}
      height={height}
      {...props}
    />
  )
}
