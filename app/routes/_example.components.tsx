import { DatePicker } from "~/components/ui/date-picker"

export default function ExampleComponentsRoute() {
  return (
    <div className="site-container">
      <section className="site-section">
        <div>
          <DatePicker
            defaultValue={String(new Date())}
            name="date-picker-example"
          />
        </div>
      </section>
    </div>
  )
}
