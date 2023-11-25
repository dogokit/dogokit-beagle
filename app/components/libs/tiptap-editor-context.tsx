import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import { EditorProvider, useCurrentEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import parse from "html-react-parser"

import { contentExample } from "./tiptap-content-example"

export function TiptapEditorContext({
  content,
  children,
}: {
  content?: string
  children?: React.ReactNode
}) {
  return (
    <EditorProvider
      extensions={[StarterKit, Highlight, Typography, Underline]}
      content={content || contentExample}
      editorProps={{ attributes: { class: "prose-config" } }}
    >
      {children}
    </EditorProvider>
  )
}

export function EditorJSONPreview() {
  const { editor } = useCurrentEditor()
  if (!editor) return null
  return (
    <pre className="text-xs">{JSON.stringify(editor.getJSON(), null, 2)}</pre>
  )
}

export function EditorHTMLPreview() {
  const { editor } = useCurrentEditor()
  if (!editor) return null
  return (
    <article className="prose-config whitespace-pre-wrap">
      {parse(editor.getHTML())}
    </article>
  )
}
