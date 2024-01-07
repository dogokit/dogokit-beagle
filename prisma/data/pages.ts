const pageAboutContent = `<h1>The story of Dogokit</h1><p>This is the paragraph after heading one. Discussing about <a target="_blank" rel="noreferrer" class="prose-a-styles" href="https://dogokit.allnimal.com/">Dogokit</strong></a> and <a target="_blank" rel="noreferrer" class="prose-a-styles" href="https://remix.run/">Remix</strong></a>.</p><pre><code>console.info("Hello World 0123");</code></pre><h2>Heading Two</h2><p>Just another paragraph after <strong>heading two</strong>. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa commodi amet aliquid eos placeat maiores quas dolor iusto accusamus laudantium sit molestiae facilis labore ipsam odit sapiente ex, dolore quis?</p><h3>Heading Three</h3><p>The last paragraph after <em>heading three</em>. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa commodi amet aliquid eos placeat maiores quas dolor iusto accusamus laudantium sit molestiae facilis labore ipsam odit sapiente ex, dolore quis?</p>`

export const dataPages = [
  {
    slug: "page",
    title: "Page Title",
    description: "Page description.",
    content: "Example page content.",
    statusSymbol: "DRAFT",
  },
  {
    slug: "about",
    title: "About",
    description: "About the project.",
    content: pageAboutContent,
    statusSymbol: "PUBLISHED",
  },
  {
    slug: "terms",
    title: "Terms and Conditions",
    description: "Some ground rules of using and having this app.",
    content: "The content of Terms.",
    statusSymbol: "PUBLISHED",
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    description: "Some respected privacy rules of from us.",
    content: "The content of Privacy.",
    statusSymbol: "PUBLISHED",
  },
]
