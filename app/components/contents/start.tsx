import { Anchor } from "~/components/ui/anchor"

export function ContentStart() {
  return (
    <>
      <div className="prose-config">
        <h2 id="start">Quick Start</h2>
        <p>
          Starting new?{" "}
          <Anchor href="https://github.com/dogokit/dogokit-remix/generate">
            Use this GitHub repo template to generate the repository
          </Anchor>
          .
        </p>
        <p>Clone with Git?</p>
        <pre>git clone git@github.com:dogokit/dogokit-remix.git</pre>
        <p>
          Create with <code>pnpx</code> or <code>pnpm dlx</code>?
        </p>
        <pre>pnpx create-remix@latest --template dogokit/dogokit-remix</pre>
        <p>
          Then make sure to explore the repo to rename and replace the contents
          along the way. As this is a template, not a blank repo generator.
        </p>
      </div>
    </>
  )
}
