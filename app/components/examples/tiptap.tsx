import {
  EditorTiptapContext,
  EditorTiptapViewHTML,
} from "~/components/libs/editor-tiptap"

export function ExampleTiptap() {
  return (
    <div className="site-container">
      <section className="site-section">
        <EditorTiptapContext>
          <EditorTiptapViewHTML />
        </EditorTiptapContext>
      </section>
    </div>
  )
}
