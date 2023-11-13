import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { Button } from "~/components/ui/button"
import { ButtonLink } from "~/components/ui/button-link"

import { requireUserId } from "~/helpers/auth"
import { modelUserPost } from "~/models/user-post.server"
import { createMeta } from "~/utils/meta"
import { createSitemap } from "~/utils/sitemap"

export const handle = createSitemap()

export const meta: MetaFunction = () =>
  createMeta({
    title: `User Posts`,
    description: `Manage created posts`,
  })

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const userId = await requireUserId(request)
  const posts = await modelUserPost.getAll({ userId })

  return json({ posts })
}

export default function UserPostsRoute() {
  const { posts } = useLoaderData<typeof loader>()

  // LATER: Use data table or check Notion's UI for links in a page

  return (
    <div className="app-container">
      <header className="app-header">
        <h2>Posts</h2>
      </header>

      <section className="app-section">
        {posts.length > 0 && (
          <ul className="space-y-4">
            {posts.map(post => {
              return (
                <li key={post.id} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Button size="xs" variant="destructive">
                      Delete
                    </Button>
                    <ButtonLink
                      size="xs"
                      variant="secondary"
                      to={`/user/posts/${post.id}`}
                    >
                      Edit
                    </ButtonLink>
                  </div>

                  <Link
                    to={`/posts/${post.slug}`}
                    className="transition hover:bg-secondary"
                  >
                    <h4>{post.title}</h4>
                  </Link>
                </li>
              )
            })}
          </ul>
        )}
      </section>
    </div>
  )
}
