import { useState, type Dispatch, type SetStateAction } from "react"

import { Anchor } from "~/components/ui/anchor"
import { Iconify } from "~/components/ui/iconify"
import { Label } from "~/components/ui/label"
import { Switch } from "~/components/ui/switch"
import { cn } from "~/utils/cn"

import serviceStackItems from "./service-stack-items.json"
import techStackItems from "./tech-stack-items.json"

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
