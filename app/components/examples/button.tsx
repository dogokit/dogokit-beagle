import { Button } from "~/components/ui/button"

export function ExampleButton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2>Variant</h2>
        <div className="flex gap-4">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2>Size</h2>
        <div className="flex gap-4">
          <Button size="xs">XS</Button>
          <Button size="sm">SM</Button>
          <Button>DEFAULT</Button>
          <Button size="lg">LG</Button>
          <Button size="xl">XL</Button>
        </div>
      </div>
    </div>
  )
}
