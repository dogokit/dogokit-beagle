import { type Editor as Editor$1, type Extensions } from "@tiptap/core"
import { type EditorProps } from "@tiptap/pm/view"
import { type JSONContent } from "@tiptap/react"
import { Editor } from "novel"

/**
 * Add this to remix.confg.js
 *
 * browserNodeBuiltinsPolyfill: { modules: { punycode: true } },
 */

type EditorNovelProps = {
  className?: string
  defaultValue?: JSONContent | string
  extensions?: Extensions
  editorProps?: EditorProps | any
  onUpdate?: (editor?: Editor$1) => void | Promise<void>
  onDebouncedUpdate?: (editor?: Editor$1) => void | Promise<void>
  debounceDuration?: number
  storageKey?: string
  disableLocalStorage?: boolean
}

export function EditorNovel(props: EditorNovelProps) {
  return <Editor {...props} disableLocalStorage={true} />
}
