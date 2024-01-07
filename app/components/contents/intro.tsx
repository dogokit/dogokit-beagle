import { IconMatch } from "~/components/libs/icon"
import { AnchorText } from "~/components/ui/anchor-text"
import { ButtonAnchor } from "~/components/ui/button-anchor"

export function ContentIntro() {
  return (
    <div className="space-y-10">
      <header className="space-y-10 text-pretty">
        <h1
          id="intro"
          className="bg-gradient-to-r from-primary to-violet-600 bg-clip-text font-display tracking-tight text-transparent"
        >
          Dogokit is a web app template kit
        </h1>
        <h2>Using Remix, React, Tailwind CSS, Radix UI, Prisma ORM, and more</h2>

        <div className="flex flex-wrap gap-4">
          <ButtonAnchor size="lg" variant="default" href="https://github.com/dogokit/dogokit-remix">
            <IconMatch icon="github" className="size-5" />
            <span>Repo on GitHub</span>
          </ButtonAnchor>
          <ButtonAnchor size="lg" variant="secondary" href="https://remix.run">
            <IconMatch icon="remix" className="size-5" />
            <span>Learn Remix</span>
          </ButtonAnchor>
        </div>
      </header>

      <div className="prose-config">
        <p>
          The goal is to start and be as productive as possible to ship a full stack web app quickly
          with <AnchorText href="https://remix.run">Remix</AnchorText> web framework.
        </p>

        <p>
          It is a highly opinionated collection of application structure, interactive UI components,
          software engineering and web development workflow, functionality hooks and utilities, also
          integration with 3rd party services.
        </p>

        <p>
          This Dogokit variant is using Remix. There's a possibility to have more variants in the
          future.
        </p>

        <ul>
          <li>
            Repo:{" "}
            <AnchorText href="https://github.com/dogokit/dogokit-remix">
              github.com/dogokit/dogokit-remix
            </AnchorText>
          </li>
          <li>
            Demo: <AnchorText href="https://dogokit.allnimal.com">dogokit.allnimal.com</AnchorText>
          </li>
        </ul>

        <p>
          Originally created by{" "}
          <AnchorText href="https://github.com/mhaidarhanif">M Haidar Hanif</AnchorText> from the{" "}
          <AnchorText href="https://allnimal.com">🐾 Allnimal</AnchorText> group (
          <AnchorText href="https://bearmentor.com">🐻 Bearmentor</AnchorText>,{" "}
          <AnchorText href="https://catamyst.com">🐱 Catamyst</AnchorText>,{" "}
          <AnchorText href="https://dogokit.allnimal.com">🐶 Dogokit</AnchorText>)
        </p>
      </div>
    </div>
  )
}
