# [🐶 Dogokit Remix](https://dogokit.com/remix)

The main Remix web app template kit by [🐶 Dogokit](https://dogokit.com) team.

> 🚧 This template kit is still a work in progress

Check out:

- Web: <https://dogokit.com/remix>
- Repo: <https://github.com/dogokit/dogokit-remix>

## Concept

- [x] Create a new [Remix](https://remix.run) app with multiple features quickly
- [x] Help existing Remix app development
- [x] Setup commonly used development and production parts
- [x] Code quality with [Prettier](https://prettier.io),
      [ESLint](https://eslint.org), [Stylelint](https://stylelint.io),
      [Commitlint](https://commitlint.js.org)
- [x] UI components and styles with [Tailwind CSS](https://tailwindcss.com),
      [Radix UI](https://radix-ui.com), bundled with
      [shadcn UI](https://ui.shadcn.com)
  - [ ] Light and dark mode theme
  - [ ] Dashboard components with [Tremor](https://tremor.so)
- [x] Icons with [Iconify](https://iconify.design)
- [x] Database with [Prisma ORM](https://prisma.io) and
      [MySQL](https://mysql.com) on [PlanetScale](https://planetscale.com)
  - Run database instance as container with
    [Docker Compose](https://docs.docker.com/compose)
  - Anyone can change them into [Drizzle ORM](https://orm.drizzle.team) and
    [PostgreSQL](https://postgresql.org) on [Neon](https://neon.tech) with some
    adjustment
- [x] Auth (authentication/authorization) with
      [Remix Auth](https://github.com/sergiodxa/remix-auth) and various
      strategies
  - Anyone can change them into [Lucia](https://lucia-auth.com)
- [x] Provide various code and utilities
  - [x] Environment variables check with [Zod](https://zod.dev)
- [ ] Testing with [Vitest](https://vitest.dev) and
      [Playwright](https://playwright.dev)
- [ ] Commands with `dogokit` CLI or `@dogokit/cli`

## Brief

Read the [guide to codebase](./docs/GUIDE_CODEBASE.md) and
[guide steps](./docs/GUIDE_STEPS.md).

## Tech Stack

The opinionated things being used and need to understand.

- [HTML](https://developer.mozilla.org/HTML)
- [CSS](https://developer.mozilla.org/CSS)
- [JavaScript](https://developer.mozilla.org/JavaScript)
- [TypeScript](https://typescriptlang.org)
- [Node.js](https://nodejs.org) vs [Bun](https://bun.sh)
- [pnpm](https://pnpm.io) vs [npm](https://npmjs.com) vs [bun](https://bun.sh)
- [React](https://react.dev): UI library
- [Remix](https://remix.run): Full stack web framework based on React and
  [React Router](https://reactrouter.com)
  - [Remix Auth](https://github.com/sergiodxa/remix-auth)
- [Tailwind CSS](https://tailwindcss.com): Styling
  - [shadcn UI](https://ui.shadcn.com): Styled interactive components and
    theming
  - [Tremor](https://tremor.so): Styled dashboard components
- [Radix UI](https://radix-ui.com): Interactive components
- [Iconify](https://iconify.design): Icon set
- [Prisma ORM](https://prisma.io): Database object relational mapping (ORM)
- [MySQL](https://mysql.com): Database management system (DBMS)
  - [PlanetScale](https://planetscale.com): MySQL-compatible serverless database
    platform
- [Docker](https://docker.com): Containerization
  - [Docker Compose](https://docs.docker.com/compose): Multi-container Docker
- [Vercel](https://vercel.com): Web app deployment
- [Cloudflare](https://cloudflare)
  - [Cloudflare DNS](https://cloudflare.com/application-services/products/dns)
  - [Domain Registrar](https://cloudflare.com/products/registrar)

Use later:

- [Vitest](https://vitest.dev) vs [Jest](https://jestjs.io)
- [React Testing Library](https://testing-library.com)
- [Playwright](https://playwright.dev) vs [Cypress](https://cypress.io)

Don't use:

- styled-components, @emotion, Stitches, Chakra UI, MUI, etc
- TanStack/React Query, SWR, Axios, etc
- Redux, Zustand, Jotai, XState, etc

## Development

### Dependencies

Use [pnpm](https://pnpm.io) to improve productivity and replace npm, so make
sure [pnpm is installed](https://pnpm.io/installation#using-npm):

```sh
npm i -g pnpm
```

To run the app locally, make sure the project's local dependencies are
installed:

```sh
pnpm install
```

> Note: Not using Bun yet as there are still some issues.

### Code

Log, format, lint to check if the setup is fine:

```sh
pnpm check
# check: env typecheck prettier eslint stylelint prisma
```

```sh
pnpm fix
# fix: prettier eslint stylelint prisma
```

> Note: Can ignore non-critical warning from ESLint and TypeScript

### Database

Prisma ORM is used to communicate with the database easily.

If prefer using Docker and Docker Compose for local development,
[follow this guide on database](docs/GUIDE_DATABASE.md).

The app will be deployed primarily using PlanetScale, the migration files are
not needed. Therefore, push the schema directly there. The migration process
will be handled through the
[deploy requests](https://planetscale.com/docs/concepts/deploy-requests).
Although using an ORM, there's still also a way to run a raw query.

Also read:

- [Prisma with PlanetScale](https://prisma.io/docs/guides/database/planetscale)
- [PlanetScale with Prisma](https://planetscale.com/docs/prisma/prisma-quickstart)

### Environment Variables

Create the `.env` file from the example `.env` file.

```sh
cp -i .env.example .env
```

> This .env file is only for local development, not production

Let's configure the required environment variables in the `.env` file if local,
otherwise in the project settings, for:

- `DATABASE_URL`
- `SESSION_SECRET`

For the database, either choose to use PlanetScale or local Docker container. If
prefer using Docker and Docker Compose for local development,
[follow this guide](docs/DATABASE.md).

Create a [PlanetScale](https://planetscale.com) account to have a MySQL instance
for development. After the database has been created, "Get the connection
string" and select "Prisma", then copy the full `DATABASE_URL`.

> Keep in mind the free plan only allow for 1 database. So either later keep it,
> delete it when unused, or upgrade the plan.

Generate a random string for the `SESSION_SECRET` using
`openssl rand -base64 32` on the terminal or put any long random text.

```sh
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/dogokit-remix?sslaccept=strict"
SESSION_SECRET="random_secret_text"
```

#### Schema to Push

Sync between Prisma schema and the database directly, by making schema changes
with `prisma db push`, which can be done regularly while updating the models:

```sh
pnpm db:push
# prisma db push
```

> Note: Only need to push the schema in development. No need for migration
> files.

Even with local development without PlanetScale, pushing the schema directly is
still okay when
[prototyping the schema](https://prisma.io/docs/concepts/components/prisma-migrate/db-push).
After a success push, then it will automatically run `prisma generate`.

#### Data for Credentials

Create `users.json` in `prisma/seed-data` folder with the format below. You can
focus on certain users who want to be able to sign in in development, so it
doesn't have to be everyone.

```json
[
  {
    "email": "user1@example.com",
    "username": "username",
    "password": "set_the_password_1"
  },
  {
    "email": "user2@example.com",
    "username": "username2"
  }
  // ...
]
```

#### Data for Seed

Then seed the initial data when needed:

```sh
pnpm db:seed
# prisma db seed
```

### Build

Check if the build is fine. This als be used to build the app for production.

```sh
pnpm build
# remix build
```

This will also run `prisma generate` too before the build.

Then try to run the app in production mode:

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

If familiar with deploying node applications, the built-in Remix app server is
production-ready. Make sure to deploy the output of `remix build`

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
