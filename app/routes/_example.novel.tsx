import { EditorNovel } from "~/components/libs/editor-novel"
import { cn } from "~/utils/cn"

export default function ExampleNovelRoute() {
  return (
    <div className="site-container">
      <section className="site-section">
        <EditorNovel
          className={cn("min-h-[500px] w-full max-w-prose bg-background")}
        />
      </section>
    </div>
  )
}
