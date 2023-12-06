import { useState, type Dispatch, type SetStateAction } from "react"

import { Anchor } from "~/components/ui/anchor"
import { Iconify } from "~/components/ui/iconify"
import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"
import { cn } from "~/utils/cn"

export function ContentStack() {
  const [items, setItems] = useState<StackItem[]>(
    techStackItems.filter(item => item.isCore),
  )

  return (
    <>
      <div className="prose-config">
        <h3>Tech Stack</h3>
        <p>
          The primary technology stack and tools in this kit which we own the
          code and raw assets. The blurred items are soon or not yet configured.
        </p>
      </div>

      <div className="space-y-4">
        <SwitchCore items={techStackItems} setItems={setItems} />
        <StackItems items={items} />
      </div>

      <div className="prose-config">
        <h3>Service Stack</h3>
        <p>
          The optional 3rd party services to enhance the development and app
          functionality. Feel free to change them as needed.
        </p>
      </div>

      <div className="space-y-4">
        <StackItems items={serviceStackItems} />
      </div>
    </>
  )
}

type StackItem = {
  name: string
  icon: string
  url: string
  isCore?: boolean
  isSoon?: boolean
}

function SwitchCore({
  items,
  setItems,
}: {
  items: StackItem[]
  setItems: Dispatch<SetStateAction<StackItem[]>>
}) {
  const [checked, setChecked] = useState(true)

  function switchCore() {
    setChecked(!checked)
    if (checked) setItems(items)
    if (!checked) setItems(items.filter(item => item.isCore))
  }

  return (
    <div className="flex items-center space-x-2">
      <Switch id="switch-core" checked={checked} onCheckedChange={switchCore} />
      <Label htmlFor="switch-core">
        {checked ? "Only the core" : "More than the core"}
      </Label>
    </div>
  )
}

function StackItems({
  items,
}: {
  items: {
    name: string
    icon: string
    url: string
    isSoon?: boolean
  }[]
}) {
  // IDEA: Make these as link to a post to explain more

  return (
    <ul className="grid grid-cols-3 gap-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {items.map(item => (
        <li key={item.name}>
          <Anchor
            href={item.url}
            className={cn(
              "focus-ring flex flex-col items-center gap-2 rounded-md px-1 py-2",
              "transition hover:opacity-75",
              item.isSoon && "blur-sm hover:blur-0 focus:blur-0",
            )}
          >
            {item.icon && <Iconify icon={item.icon} className="text-4xl" />}
            <span className="text-center text-sm font-semibold">
              {item.name}
            </span>
          </Anchor>
        </li>
      ))}
    </ul>
  )
}

const techStackItems = [
  {
    name: "Remix",
    icon: "simple-icons:remix",
    url: "https://remix.run",
    isCore: true,
  },
  {
    name: "React",
    icon: "logos:react",
    url: "https://react.dev",
    isCore: true,
  },
  {
    name: "Vite",
    icon: "logos:vitejs",
    url: "https://vitejs.dev",
    isSoon: true,
  },
  {
    name: "Node.js",
    icon: "logos:nodejs-icon",
    url: "https://nodejs.org",
  },
  {
    name: "TypeScript",
    icon: "logos:typescript-icon",
    url: "https://typescriptlang.org",
    isCore: true,
  },
  {
    name: "JavaScript",
    icon: "logos:javascript",
    url: "https://developer.mozilla.org/JavaScript",
  },
  {
    name: "HTML",
    icon: "logos:html-5",
    url: "https://developer.mozilla.org/HTML",
  },
  {
    name: "CSS",
    icon: "logos:css-3",
    url: "https://developer.mozilla.org/CSS",
  },
  {
    name: "PostCSS",
    icon: "logos:postcss",
    url: "https://postcss.org",
  },
  {
    name: "Autoprefixer",
    icon: "logos:autoprefixer",
    url: "https://autoprefixer.org",
  },
  {
    name: "Tailwind CSS",
    icon: "logos:tailwindcss-icon",
    url: "https://tailwindcss.com",
    isCore: true,
  },
  {
    name: "Radix UI",
    icon: "tabler:brand-radix-ui",
    url: "https://radix-ui.com",
    isCore: true,
  },
  {
    name: "shadcn UI",
    icon: "tabler:square-rounded-letter-s",
    url: "https://ui.shadcn.com",
    isCore: true,
  },
  {
    name: "Prisma ORM",
    icon: "simple-icons:prisma",
    url: "https://prisma.io",
    isCore: true,
  },
  {
    name: "MySQL",
    icon: "logos:mysql-icon",
    url: "https://mysql.org",
    isCore: true,
  },
  {
    name: "Docker",
    icon: "logos:docker-icon",
    url: "https://docker.com",
    isCore: true,
  },
  {
    name: "Conform",
    icon: "tabler:square-rounded-letter-c",
    url: "https://conform.guide",
    isCore: true,
  },
  {
    name: "Zod",
    icon: "logos:zod",
    url: "https://zod.dev",
    isCore: true,
  },
  {
    name: "React Email",
    icon: "tabler:square-rounded-letter-r",
    url: "https://react.email",
    isCore: true,
  },
  {
    name: "VS Code",
    icon: "logos:visual-studio-code",
    url: "https://code.visualstudio.com",
  },
  {
    name: "Prettier",
    icon: "logos:prettier",
    url: "https://prettier.org",
  },
  {
    name: "ESLint",
    icon: "logos:eslint",
    url: "https://eslint.org",
  },
  {
    name: "MSW",
    icon: "logos:msw-icon",
    url: "https://mswjs.io",
    isSoon: true,
  },
  {
    name: "Vitest",
    icon: "logos:vitest",
    url: "https://vitest.dev",
    isSoon: true,
  },
  {
    name: "Testing Library",
    icon: "logos:testing-library",
    url: "https://testing-library.com",
    isSoon: true,
  },
  {
    name: "Playwright",
    icon: "logos:playwright",
    url: "https://playwright.io",
    isSoon: true,
  },
]

const serviceStackItems = [
  {
    name: "PlanetScale",
    icon: "simple-icons:planetscale",
    url: "https://planetscale.com",
  },
  {
    name: "Vercel",
    icon: "simple-icons:vercel",
    url: "https://vercel.com",
  },
  {
    name: "GitHub",
    icon: "simple-icons:github",
    url: "https://github.com",
  },
  {
    name: "Uploadcare",
    icon: "tabler:square-rounded-letter-u",
    url: "https://uploadcare.com",
  },
  {
    name: "Resend",
    icon: "tabler:square-rounded-letter-r",
    url: "https://resend.com",
    isSoon: true,
  },
  {
    name: "ConvertKit",
    icon: "tabler:square-rounded-letter-c",
    url: "https://convertkit.com",
    isSoon: true,
  },
  {
    name: "Sentry",
    icon: "logos:sentry-icon",
    url: "https://sentry.io",
    isSoon: true,
  },
  {
    name: "Novu",
    icon: "tabler:square-rounded-letter-n",
    url: "https://novu.co",
    isSoon: true,
  },
  {
    name: "OpenStatus",
    icon: "tabler:square-rounded-letter-o",
    url: "https://openstatus.dev",
    isSoon: true,
  },
]
