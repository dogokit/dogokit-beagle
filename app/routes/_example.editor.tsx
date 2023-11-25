import {
  EditorHTMLPreview,
  TiptapEditorContext,
} from "~/components/libs/tiptap-editor-context"

export default function ExampleEditor() {
  return (
    <div className="site-container">
      <section className="site-section">
        <TiptapEditorContext>
          <EditorHTMLPreview />
        </TiptapEditorContext>
      </section>
    </div>
  )
}
