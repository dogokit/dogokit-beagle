# [🐶 Dogokit with 💿 Remix](https://dogokit.com/remix)

The main Remix web app template kit by [🐶 Dogokit](https://dogokit.com) team.

> 🚧 This template kit is still in early and active development

Check out:

- Web: <https://dogokit.com/remix>
- Repo: <https://github.com/dogokit/dogokit-remix>

## Concept

- [x] Create a new [Remix](https://remix.run) app with multiple features quickly
- [x] Help existing Remix app development
- [x] Setup commonly used development and production parts
- [x] Provide various code and utilities
- [x] Code quality with [Prettier](https://prettier.io), [ESLint](https://eslint.org), [Stylelint](https://stylelint.io), [Commitlint](https://commitlint.js.org)
- [x] UI components and styles with [Tailwind CSS](https://tailwindcss.com), [Radix UI](https://radix-ui.com), bundled with [shadcn UI](https://ui.shadcn.com)
- [ ] UI for dashboard components with [Tremor](https://tremor.so)
- [x] Database with [Prisma ORM](https://prisma.io) and [MySQL](https://mysql.com) on [PlanetScale](https://planetscale.com)
  - Anyone can change them into [Drizzle ORM](https://orm.drizzle.team) and [PostgreSQL](https://postgresql.org) on [Neon](https://neon.tech) with some adjustment
- [ ] Testing with [Vitest](https://vitest.dev) and [Playwright](https://playwright.dev)
- [ ] Commands with `dogokit` CLI or `@dogokit/cli`

## Brief

Read the [guide to codebase](./docs/GUIDE_CODEBASE.md) and [guide steps](./docs/GUIDE_STEPS.md).

## Tech Stack

Things being used and need to understand.

- HTML
- CSS
- JavaScript
- TypeScript
- Node.js vs Bun
- pnpm vs npm vs bun
- [React](https://react.dev)
- [Remix Docs](https://remix.run)
- Tailwind CSS
- Radix UI
- shadcn UI
- Prisma ORM
- MySQL
- PlanetScale
- Remix Auth
- Vercel
- Cloudflare DNS and Domains

Later:

- Vitest vs Jest
- Playwright vs Cypress

## Development

From the terminal:

```sh
pnpm dev
```

This starts the app in development mode, rebuilding assets on file changes.

## Deployment

First, build the app for production:

```sh
pnpm build
```

Then run the app in production mode:

```sh
pnpm start
```

Now need to pick a host to deploy it to, such as:

- Vercel
- Netlify
- Fly.io
- Google Cloud
- Amazon Web Services

### DIY

If familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

## References

### Used by

- [🐾 Allnimal](https://allnimal.com)
- [🐻 Bearmentor](https://bearmentor.com)
- [🐱 Catamyst](https://catamyst.com)
- [🐶 Dogokit](https://dogokit.com)
