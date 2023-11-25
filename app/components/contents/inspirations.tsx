import { Anchor } from "~/components/ui/anchor"

export function ContentInspirations() {
  return (
    <>
      <div className="prose-config">
        <h2 id="inspirations">Inspirations</h2>
        <ul>
          {inspirationItems.map(item => (
            <li key={item.href}>
              <Anchor href={item.href}>{item.text}</Anchor>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

const inspirationItems = [
  {
    text: "💿 Remix Indie Stack",
    href: "https://github.com/remix-run/indie-stack",
  },
  {
    text: "🚀 The Epic Stack by Kent C. Dodds",
    href: "https://github.com/epicweb-dev/epic-stack",
  },
  {
    text: "Synthwave Stack by I4O Open Source",
    href: "https://github.com/i4o-oss/synthwave-stack",
  },
  {
    text: "MakerKit - SaaS Starter Kits based on React",
    href: "https://makerkit.dev",
  },
  {
    text: "SaasRock - The One-Man SaaS Framework",
    href: "https://saasrock.com",
  },
]
