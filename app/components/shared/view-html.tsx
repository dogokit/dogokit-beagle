import parseHTML from "html-react-parser"

export function ViewHTML({ children }: { children: string }) {
  return (
    <article className="prose-config whitespace-pre-wrap">
      {parseHTML(children)}
    </article>
  )
}