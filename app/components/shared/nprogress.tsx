import { useNavigation } from "@remix-run/react"
import { useNProgress } from "@tanem/react-nprogress"

import { Iconify } from "~/components/ui/iconify"

export function NProgress() {
  const navigation = useNavigation()
  const isAnimating = navigation.state === "loading"

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

function Container({
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

function Bar({
  animationDuration,
  progress,
}: {
  animationDuration: number
  progress: number
}) {
  return (
    <div
      className="fixed left-0 top-0 z-50 h-1 w-full animate-pulse bg-primary"
      style={{
        marginLeft: `${(-1 + progress) * 100}%`,
        transition: `margin-left ${animationDuration}ms linear`,
      }}
    />
  )
}

function Spinner() {
  return (
    <div className="fixed bottom-4 right-4 z-50 block">
      <Iconify
        icon="ph:spinner-gap-bold"
        className="animate-spin text-4xl text-primary duration-1000"
      />
    </div>
  )
}
