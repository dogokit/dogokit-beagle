import { EditorViewHTML, TiptapEditorContext } from "~/components/libs/tiptap"

export default function ExampleEditor() {
  return (
    <div className="site-container">
      <section className="site-section">
        <TiptapEditorContext>
          <EditorViewHTML />
        </TiptapEditorContext>
      </section>
    </div>
  )
}
