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
  return (
    <div
      className="pointer-events-none fixed z-50"
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms ease-in-out`,
      }}
    >
      {children}
    </div>
  )
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
        "fixed left-0 top-0 z-50 h-2 w-full animate-pulse",
        "border-b-4 border-indigo-600 bg-indigo-600 dark:bg-indigo-400",
      )}
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    >
      <div
        className="absolute right-0 block h-full w-full opacity-100"
        style={{
          boxShadow: "0 0 10px #29d, 0 0 5px #29d",
          transform: "rotate(3deg) translate(0px, -4px)",
        }}
      />
    </div>
  )
}

export function Spinner() {
  return (
    <div className="fixed bottom-4 right-4 z-50 block">
      <Iconify
        icon="ph:spinner-duotone"
        className={cn(
          "text-2xl text-indigo-500",
          "animate-spin duration-500",
          "z-50 box-border h-6 w-6 rounded-full border-4 border-transparent",
        )}
      />
    </div>
  )
}
