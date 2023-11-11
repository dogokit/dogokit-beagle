import { Anchor } from "~/components/ui/anchor"

export function ContentCredits() {
  return (
    <>
      <div className="prose-config">
        <h2 id="credits">Credits</h2>
        <ul>
          {creditItems.map(item => {
            return (
              <li key={item.href}>
                <Anchor href={item.href}>{item.text}</Anchor>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

const creditItems = [{ href: "https://example.com", text: "Example" }]
