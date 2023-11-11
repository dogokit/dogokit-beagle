import { Anchor } from "~/components/ui/anchor"
import { Iconify } from "~/components/ui/iconify"
import { cn } from "~/utils/cn"

import techStackItems from "./tech-stack-items.json"
import techStackServices from "./tech-stack-services.json"

export function ContentTechStack() {
  return (
    <>
      <div className="prose-config">
        <h3>Tech Stack</h3>
        <p>
          The primary technologies and tools in this kit. The blurred items
          aren't yet.
        </p>
      </div>
      <TechStackItems items={techStackItems} />

      <div className="prose-config">
        <h3>Service Stack</h3>
        <p>
          The optional 3rd party services to enhance the app functionality. Feel
          free to change them as needed.
        </p>
      </div>
      <TechStackItems items={techStackServices} />
    </>
  )
}

export function TechStackItems({
  items,
}: {
  items: {
    name: string
    icon: string
    url: string
    isSoon?: boolean
  }[]
}) {
  return (
    <ul className="grid grid-cols-3 gap-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {items.map(item => {
        return (
          <li
            key={item.name}
            className={cn(item.isSoon && "blur-sm transition hover:blur-0")}
          >
            <Anchor
              href={item.url}
              className="flex flex-col items-center gap-2 py-2"
            >
              {item.icon && <Iconify icon={item.icon} className="text-4xl" />}
              <span className="text-center text-sm font-semibold">
                {item.name}
              </span>
            </Anchor>
          </li>
        )
      })}
    </ul>
  )
}
