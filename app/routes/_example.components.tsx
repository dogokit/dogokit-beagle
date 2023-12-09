import { Link, Outlet } from "@remix-run/react"
import { Card } from "~/components/ui/card"
import { configComponents } from "~/configs/components"

export default function ExampleComponentsRoute() {
  return (
    <div className="site-container">
      <section className="flex flex-col flex-wrap gap-4 sm:flex-row">
        <div className="prose-config">
          <h1>Components</h1>
          <ul>
            {configComponents.map(component => (
              <li key={component.slug}>
                <Link to={`/components/${component.slug}`}>
                  {component.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Card className="flex-1 p-4">
          <Outlet />
        </Card>
      </section>
    </div>
  )
}
