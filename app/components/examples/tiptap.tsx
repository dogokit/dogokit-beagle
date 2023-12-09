import {
  EditorTiptapContext,
  EditorTiptapViewHTML,
} from "~/components/libs/editor-tiptap"

export function ExampleTiptap() {
  return (
    <EditorTiptapContext>
      <EditorTiptapViewHTML />
    </EditorTiptapContext>
  )
}
