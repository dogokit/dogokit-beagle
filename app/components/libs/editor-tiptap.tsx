import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import {
  EditorContent,
  EditorProvider,
  useCurrentEditor,
  useEditor,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import parseHTML from "html-react-parser"

export function EditorTiptapHook({
  content,
  handleUpdate,
}: {
  content?: string
  handleUpdate?: (htmlString: string) => void
}) {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography, Underline],
    editorProps: { attributes: { class: "prose-config" } },
    content: content || contentExample,
    onUpdate({ editor }) {
      if (handleUpdate) {
        handleUpdate(editor.getHTML())
      }
    },
  })

  if (!editor) return null

  return (
    <>
      <EditorContent editor={editor} />
    </>
  )
}

export function EditorTiptapContext({
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

export function EditorTiptapViewJSON() {
  const { editor } = useCurrentEditor()
  if (!editor) return null
  return (
    <pre className="text-xs">{JSON.stringify(editor.getJSON(), null, 2)}</pre>
  )
}

export function EditorTiptapViewHTML() {
  const { editor } = useCurrentEditor()
  if (!editor) return null
  return (
    <article className="prose-config whitespace-pre-wrap">
      {parseHTML(editor.getHTML())}
    </article>
  )
}

export function ViewHTML({ children }: { children: string }) {
  return (
    <article className="prose-config whitespace-pre-wrap">
      {parseHTML(children)}
    </article>
  )
}

export const contentExample = `
<h2>
  Hi there,
</h2>
<p>
  this is a basic <em>basic</em> example of <strong>TipTap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work! 👏
  <br />
  — Somebody
</blockquote>
<p>
  To test that, start a new line and type <code>#</code> followed by a space to get a heading. Try <code>#</code>, <code>##</code>, <code>###</code>, <code>####</code>, <code>#####</code>, <code>######</code> for different levels.
</p>
<p>
  Those conventions are called input rules in tiptap. Some of them are enabled by default. Try <code>></code> for blockquotes, <code>*</code>, <code>-</code> or <code>+</code> for bullet lists, or <code>\`foobar\`</code> to highlight code, <code>~~tildes~~</code> to strike text, or <code>==equal signs==</code> to highlight text.
</p>
<p>
  You can overwrite existing input rules or add your own to nodes, marks and extensions.
</p>
<p>
  For example, we added the <code>Typography</code> extension here. Try typing <code>(c)</code> to see how it’s converted to a proper © character. You can also try <code>-></code>, <code>>></code>, <code>1/2</code>, <code>!=</code>, or <code>--</code>.
</p>
`
