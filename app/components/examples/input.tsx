import { Input } from "~/components/ui/input"

export function ExampleInput() {
  return (
    <div className="space-y-8">
      <header>
        <h2>Input</h2>
        <p>Displays a form input field or a component that looks like an input field.</p>
      </header>

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
