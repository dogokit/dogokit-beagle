import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import Underline from "@tiptap/extension-underline"
import {
  BubbleMenu,
  EditorContent,
  EditorProvider,
  useCurrentEditor,
  useEditor,
  type Content,
} from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"

import { buttonVariants } from "~/components/ui/button"
import { Iconify } from "~/components/ui/iconify"
import { cn } from "~/utils/cn"
import { parseHTML } from "~/utils/html"

export function EditorTiptapHook({
  content,
  handleUpdate,
}: {
  content?: Content | string
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

  const buttonActive = cn(
    buttonVariants({
      variant: "default",
      size: "xs",
      isIcon: true,
    }),
  )
  const buttonInactive = cn(
    buttonVariants({
      variant: "ghost",
      size: "xs",
      isIcon: true,
    }),
  )

  return (
    <>
      <EditorContent editor={editor} className="cursor-text" />

      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="flex items-center gap-1 rounded-md bg-muted p-1"
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? buttonActive : buttonInactive}
        >
          <Iconify icon="ph:text-b" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? buttonActive : buttonInactive}
        >
          <Iconify icon="ph:text-italic" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? buttonActive : buttonInactive}
        >
          <Iconify icon="ph:text-strikethrough" />
        </button>
      </BubbleMenu>
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
      editorProps={{
        attributes: { class: "prose-config cursor-text" },
      }}
    >
      {children}
    </EditorProvider>
  )
}

export function EditorTiptapContextViewHTML() {
  const { editor } = useCurrentEditor()
  if (!editor) return null
  return (
    <article className="prose-config whitespace-pre-wrap">
      {parseHTML(editor.getHTML())}
    </article>
  )
}

const contentExample = `
<h1>
  Tiptap Example
</h1>
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
