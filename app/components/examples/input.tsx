import { Input } from "~/components/ui/input"

export function ExampleInput() {
  return (
    <div className="space-y-8">
      <h2>Input</h2>
      <div className="space-y-4">
        <h3>Variant</h3>
        <div className="flex max-w-xs flex-col gap-4">
          <Input placeholder="Default" />
          <input className="input-natural" placeholder="Natural" />
        </div>
      </div>
    </div>
  )
}
