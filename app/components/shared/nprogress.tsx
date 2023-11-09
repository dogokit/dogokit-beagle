import { useNavigation } from "@remix-run/react"
import { useNProgress } from "@tanem/react-nprogress"

import { Iconify } from "~/components/ui/iconify"
import { cn } from "~/utils/cn"

export function NProgress() {
  const navigation = useNavigation()
  const isAnimating = navigation.state !== "idle"

  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  })

  return (
    <Container animationDuration={animationDuration} isFinished={isFinished}>
      <Bar animationDuration={animationDuration} progress={progress} />
      <Spinner />
    </Container>
  )
}

export function Container({
  animationDuration,
  isFinished,
  children,
}: {
  animationDuration: number
  isFinished: boolean
  children: React.ReactNode
}) {
  return <div className="pointer-events-none fixed z-50">{children}</div>
}

export function Bar({
  animationDuration,
  progress,
}: {
  animationDuration: number
  progress: number
}) {
  return (
    <div
      className={cn(
        "absolute left-0 top-0 z-50 h-2 w-full animate-pulse",
        "border-b-4 border-indigo-600 bg-indigo-600 dark:bg-indigo-400",
      )}
    />
  )
}

export function Spinner() {
  return (
    <div className="absolute bottom-4 right-4 z-50 block">
      <Iconify
        icon="ph:spinner-duotone"
        className={cn(
          "animate-spin duration-500",
          "z-50 box-border h-6 w-6 rounded-full border-4 border-transparent",
          "border-l-indigo-600 border-t-indigo-600 dark:border-l-indigo-300 dark:border-t-indigo-300",
        )}
      />
    </div>
  )
}
