# [🐶 Dogokit Remix](https://dogokit.com/remix)

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
- [x] Icons with [Iconify](https://iconify.design)
- [x] Database with [Prisma ORM](https://prisma.io) and [MySQL](https://mysql.com) on [PlanetScale](https://planetscale.com)
  - Run database instance as container with [Docker Compose](https://docs.docker.com/compose)
  - Anyone can change them into [Drizzle ORM](https://orm.drizzle.team) and [PostgreSQL](https://postgresql.org) on [Neon](https://neon.tech) with some adjustment
- [x] Auth (authentication/authorization) with [Remix Auth](https://github.com/sergiodxa/remix-auth) and various strategies
  - Anyone can change them into [Lucia](https://lucia-auth.com)
- [ ] Testing with [Vitest](https://vitest.dev) and [Playwright](https://playwright.dev)
- [ ] Commands with `dogokit` CLI or `@dogokit/cli`

## Brief

Read the [guide to codebase](./docs/GUIDE_CODEBASE.md) and [guide steps](./docs/GUIDE_STEPS.md).

## Tech Stack

The opiniated things being used and need to understand.

- [HTML](https://developer.mozilla.org/HTML)
- [CSS](https://developer.mozilla.org/CSS)
- [JavaScript](https://developer.mozilla.org/JavaScript)
- [TypeScript](https://typescriptlang.org)
- [Node.js](https://nodejs.org) vs [Bun](https://bun.sh)
- [pnpm](https://pnpm.io) vs [npm](https://npmjs.com) vs [bun](https://bun.sh)
- [React](https://react.dev)
- [Remix](https://remix.run)
  - [Remix Auth](https://github.com/sergiodxa/remix-auth)
- [Tailwind CSS](https://tailwindcss.com)
  - [shadcn UI](https://ui.shadcn.com)
  - [Tremor](https://tremor.so)
- [Radix UI](https://radix-ui.com)
- [Iconify](https://iconify.design)
- [Prisma ORM](https://prisma.io)
- [MySQL](https://mysql.com)
  - [PlanetScale](https://planetscale.com)
- [Docker](https://docker.com) and [Docker Compose](https://docs.docker.com/compose)
- [Vercel](https://vercel.com)
- [Cloudflare DNS](https://cloudflare.com/application-services/products/dns) and [Domain Registrar](https://cloudflare.com/products/registrar)

Use only later:

- [Vitest](https://vitest.dev) vs [Jest](https://jestjs.io)
- [React Testing Library](https://testing-library.com)
- [Playwright](https://playwright.dev) vs [Cypress](https://cypress.io)

Don't use:

- styled-components, @emotion, Stitches, Chakra UI, MUI, etc
- TanStack/React Query, SWR, Axios, etc
- Redux, Zustand, Jotai, XState, etc

## Development

From the terminal:

```sh
pnpm dev
```

This starts the app in development mode, rebuilding assets on file changes.

## Deployment

Build the app for production:

```sh
pnpm build
```

Run the app in production mode:

```sh
pnpm start
```

Then pick a host to deploy it to, such as:

- Vercel
- Netlify
- Fly.io
- Render.com
- Railway.app
- Google Cloud
- Amazon Web Services
- Microsoft Azure

### DIY

If familiar with deploying node applications, the built-in Remix app server is production-ready. Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

## References

### Used by

- [🐾 Allnimal](https://allnimal.com)
- [🐻 Bearmentor](https://bearmentor.com)
- [🐱 Catamyst](https://catamyst.com)
- [🐶 Dogokit](https://dogokit.com)

---

2023 ©️ 🐶 Dogokit with 💿 Remix.
