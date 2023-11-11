export function ContentQuickStart() {
  return (
    <>
      <div className="prose-config">
        <h2 id="quick-start">Quick Start</h2>
        <p>
          Starting new?{" "}
          <a href="https://github.com/dogokit/dogokit-remix/generate">
            Use this template to generate the repository
          </a>
          .
        </p>
        <p>Clone?</p>
        <pre>
          <>git clone git@github.com:dogokit/dogokit-remix.git</>
        </pre>
        <p>
          Use <code>npx</code> or <code>pnpx</code>?
        </p>
        <pre>
          npx create-remix@latest --template dogokit/dogokit-remix # or pnpx
          create-remix@latest --template dogokit/dogokit-remix
        </pre>
        <p>
          Then make sure to explore the repo to rename and replace the contents
          along the way. As this is a template, not a blank repo generator.
        </p>
      </div>
    </>
  )
}
