import { FormNew } from "~/components/shared/form-new"
import { configNewItems } from "~/configs/new"

/**
 * New Anything:
 * - New Post
 * - New User
 * - New Mentor/Mentee
 * - New Job
 */
export default function NewRoute() {
  return (
    <div className="app-container">
      <section className="mx-auto max-w-prose">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {configNewItems.map(item => {
            return (
              <li key={item.action}>
                <FormNew
                  action={item.action}
                  buttonText={item.buttonText}
                  icon={item.icon}
                />
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
