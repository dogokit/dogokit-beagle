import { EditorTiptapHook } from "~/components/libs/editor-tiptap"

export function ExampleTiptap() {
  return (
    <div className="space-y-8">
      <header>
        <h2>TipTap</h2>
        <p>Rich text editor or WYSIWYG editor.</p>
      </header>

      <EditorTiptapHook />
    </div>
  )
}
