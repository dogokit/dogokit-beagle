# [🐶 Dogokit Remix](https://remix.dogokit.com)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Remix](https://img.shields.io/badge/Remix-000000?style=flat-square&logo=remix&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-111111?style=flat-square&logo=framer&logoColor=white)
![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PlanetScale](https://img.shields.io/badge/PlanetScale-000000?style=flat-square&logo=planetscale&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

> 🚧 This is a work in progress

The main Remix web app template kit by [🐶 Dogokit](https://dogokit.com).

The goal is to be as productive as possible to ship a web app quickly with
[Remix](https://remix.run). So it is a highly opinionated collection of
application structure, software engineering and web development workflow,
interactive UI components, functionality hooks and utilities.

Check out:

- Web: <https://remix.dogokit.com>
- Repo: <https://github.com/dogokit/dogokit-remix>

Read the [guide to codebase](./docs/GUIDE_CODEBASE.md) and
[guide steps](./docs/GUIDE_STEPS.md).

Follow the progress on [GitHub @mhaidarhanif](https://github.com/mhaidarhanif)
and [Twitter/X @mhaidarhanif](https://twitter.com/mhaidarhanif).

- [🐶 Dogokit Remix](#-dogokit-remix)
  - [Goals](#goals)
  - [Concept](#concept)
  - [Quick start](#quick-start)
  - [Tech Stack](#tech-stack)
  - [Setup](#setup)
    - [Dependencies](#dependencies)
    - [Code Quality](#code-quality)
    - [Database Instance](#database-instance)
    - [Environment Variables](#environment-variables)
    - [Database Operations](#database-operations)
    - [Build](#build)
    - [Development](#development)
  - [References](#references)

## Goals

The goal is to use this for building web apps:

- Personal Website
- Company Profile
- Interactive Form
- Todo List
- Blog or News
- Social Media
- Community Forum
- Support Desk
- Art Gallery
- Job Board
- Hiring or Recruitment
- Applicant Tracking System (ATS)
- Inventory Management
- Events Management
- Knowledge Management
- Admin Panel or Dashboard
- E-Commerce or Storefront
- Product or Project Management
- Content Management System (CMS)
- Learning Management System (LMS)
- Software as a Service (SaaS)

## Concept

The reason of using this template kit. (Only the items checked ✅ are done)

- [x] Create a new [Remix](https://remix.run) app or existing one with multiple
      features quickly
- [x] Setup commonly used development and production parts
  - Using [pnpm](https://pnpm.io) by default
- [x] Code quality with [Prettier](https://prettier.io),
      [ESLint](https://eslint.org), [Stylelint](https://stylelint.io),
      [Commitlint](https://commitlint.js.org)
- [x] UI components and styles with [Tailwind CSS](https://tailwindcss.com),
      [Radix UI](https://radix-ui.com), bundled with
      [shadcn UI](https://ui.shadcn.com)
  - [x] Light and dark mode theme
  - [ ] Dashboard components with [Tremor](https://tremor.so)
- [x] Icons with [Iconify](https://iconify.design)
- [x] Database with [Prisma ORM](https://prisma.io) and
      [MySQL](https://mysql.com) on [PlanetScale](https://planetscale.com)
  - Run database instance as container with
    [Docker Compose](https://docs.docker.com/compose)
  - Anyone can change them into [Drizzle ORM](https://orm.drizzle.team) and
    [PostgreSQL](https://postgresql.org) on [Neon](https://neon.tech) with some
    adjustment
- [x] Auth (authentication and authorization) with
      [Remix Auth](https://github.com/sergiodxa/remix-auth) using various
      strategies
- [x] Provide various code and utilities
  - [x] Environment variables check with [Zod](https://zod.dev)
- [ ] Testing with [Vitest](https://vitest.dev) and
      [Playwright](https://playwright.dev)
- [ ] Commands with `dogokit` CLI or `@dogokit/cli`

## Quick start

Starting new?
[Use this template to generate the repository](https://github.com/dogokit/dogokit-remix/generate).

Clone?

```sh
git clone git@github.com:dogokit/dogokit-remix.git
```

Use `npx` or `pnpx`?

```sh
npx create-remix@latest --template dogokit/dogokit-remix
# or
pnpx create-remix@latest --template dogokit/dogokit-remix
```

Then make sure to explore the repo to rename and replace the contents along the
way. As this is a template, not a blank repo generator.

## Tech Stack

The main prerequisites to learn, understand, and use with the stack. See the
complete and categorized list in the
[guide to tech stack](./docs/GUIDE_TECH_STACK.md) including things to consider
to use later and won't use at all.

(Architecture diagram can help later on here)

- [TypeScript](https://typescriptlang.org)
- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [React](https://react.dev)
- [Remix](https://remix.run)
- [Iconify](https://iconify.design)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://radix-ui.com)
- [Prisma ORM](https://prisma.io)
- [MySQL](https://mysql.com)
- [Docker](https://docker.com) and
  [Docker Compose](https://docs.docker.com/compose)

## Setup

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

### Code Quality

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

### Database Instance

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

### Database Operations

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

Create `users.json` in `prisma/credentials` folder with the format below. Can
focus on certain users who want to be able to sign in in development, so it
doesn't have to be everyone.

```json
[
  {
    "fullname": "User One",
    "username": "username1",
    "email": "user1@example.com",
    "password": "user_password_1"
  },
  {
    "fullname": "User Two",
    "username": "username2",
    "email": "user2@example.com"
  }
  // ...
]
```

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

### Development

Finally, develop the app while running the development server:

```sh
pnpm dev
# remix dev --manual
```

## Author

Created by [@mhaidarhanif](https://github.com/mhaidarhanif) in 2023, from the 🐾
Allnimal group (🐻 Bearmentor, 🐱 Catamyst, 🐶 Dogokit)

## References

Inspirations:

- [💿 Remix Indie Stack](https://github.com/remix-run/indie-stack)
- [🚀 The Epic Stack](https://github.com/epicweb-dev/epic-stack)
- [Next SaaS Stripe Starter](https://github.com/mickasmt/next-saas-stripe-starter)

Tech Stack List:

- [🐶 Dogokit Stack](https://github.com/dogokit/dogokit-stack)
- [🐶 Dogokit Stack All](https://github.com/dogokit/dogokit-stack-all)

Used by:

- [🐾 Allnimal](https://allnimal.com)
- [🐻 Bearmentor](https://bearmentor.com)
- [🐱 Catamyst](https://catamyst.com)
- [🐶 Dogokit](https://dogokit.com)

---

2023 ©️ 🐶 Dogokit
