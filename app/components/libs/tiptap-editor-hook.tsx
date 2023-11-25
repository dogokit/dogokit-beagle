import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { contentExample } from "./tiptap-content-example"

export function TiptapEditorHook({ content }: { content?: string }) {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography, Underline],
    editorProps: { attributes: { class: "prose-config" } },
    content: content || contentExample,
  })

  if (!editor) return null

  return (
    <div>
      <EditorContent editor={editor} />
    </div>
  )
}
