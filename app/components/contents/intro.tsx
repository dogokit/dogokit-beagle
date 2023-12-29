import { AnchorText } from "~/components/ui/anchor-text"
import { cn } from "~/utils/cn"
import { ButtonAnchor } from "../ui/button-anchor"
import { Iconify } from "../ui/iconify"

export function ContentIntro() {
  return (
    <div className="space-y-10">
      <header className="space-y-10 text-pretty">
        <h1
          id="intro"
          className={cn(
            "text-5xl sm:text-6xl md:text-7xl",
            "font-display tracking-tight text-primary",
            "bg-gradient-to-r from-primary to-violet-600 bg-clip-text text-transparent",
          )}
        >
          Dogokit is a web app template kit
        </h1>
        <h2>
          Using Remix, React, Tailwind CSS, Radix UI, Prisma ORM, and more
        </h2>
        <div className="flex gap-2">
          <ButtonAnchor size="lg" href="https://remix.run">
            <Iconify icon="simple-icons:remix" className="size-5" />
            <span>Learn Remix</span>
          </ButtonAnchor>
          <ButtonAnchor
            size="lg"
            variant="secondary"
            href="https://github.com/dogokit/dogokit-remix"
          >
            <Iconify icon="simple-icons:github" className="size-5" />
            <span>Repo on GitHub</span>
          </ButtonAnchor>
        </div>
      </header>

      <div className="prose-config">
        <p>
          The goal is to start and be as productive as possible to ship a full
          stack web app quickly with{" "}
          <AnchorText href="https://remix.run">Remix</AnchorText> web framework.
        </p>

        <p>
          It is a highly opinionated collection of application structure,
          interactive UI components, software engineering and web development
          workflow, functionality hooks and utilities, also integration with 3rd
          party services.
        </p>

        <p>
          This Dogokit variant is using Remix. There's a possibility to have
          more variants in the future.
        </p>

        <ul>
          <li>
            Repo:{" "}
            <AnchorText href="https://github.com/dogokit/dogokit-remix">
              github.com/dogokit/dogokit-remix
            </AnchorText>
          </li>
          <li>
            Demo:{" "}
            <AnchorText href="https://dogokit.allnimal.com">
              dogokit.allnimal.com
            </AnchorText>
          </li>
        </ul>

        <p>
          Originally created by{" "}
          <AnchorText href="https://github.com/mhaidarhanif">
            M Haidar Hanif
          </AnchorText>{" "}
          from the{" "}
          <AnchorText href="https://allnimal.com">🐾 Allnimal</AnchorText> group
          (<AnchorText href="https://bearmentor.com">🐻 Bearmentor</AnchorText>,{" "}
          <AnchorText href="https://catamyst.com">🐱 Catamyst</AnchorText>,{" "}
          <AnchorText href="https://dogokit.allnimal.com">
            🐶 Dogokit
          </AnchorText>
          )
        </p>
      </div>
    </div>
  )
}
