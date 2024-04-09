# [🐶 Dogokit Remix](https://dogokit.allnimal.com)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Remix](https://img.shields.io/badge/Remix-000000?style=flat-square&logo=remix&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-111111?style=flat-square&logo=framer&logoColor=white)
![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

> 🚧 Migrating to PostgreSQL (Neon) from MySQL (PlanetScale)

Dogokit Remix is a web app template kit by [🐶 Dogokit](https://dogokit.allnimal.com) using Remix,
React, Tailwind CSS, Radix UI, Prisma ORM, and more. Read the latest updates and details on
[dogokit/dogokit-remix](https://github.com/dogokit/dogokit-remix).

The goal is to start and be as productive as possible to ship a web app quickly with
[Remix](https://remix.run) full stack web framework. It is a highly opinionated collection of
application structure, interactive UI components, software engineering and web development workflow,
functionality hooks and utilities, also integration with 3rd party services.

Check out:

- Web: <https://dogokit.allnimal.com>
- Repo: <https://github.com/dogokit/dogokit-remix>

> 📝 This notice below can be used to remind about the latest complete docs

The repo is based on [Dogokit](https://dogokit.allnimal.com) that using Remix, React, Tailwind CSS,
Radix UI, Prisma ORM, and more. For more details and documentation,
[check its repo](https://github.com/dogokit/dogokit-remix).

## Table of Contents

- [Quick Start](#quick-start)
- [Goal](#goal)
- [Prerequisites](#prerequisites)
- [Concept](#concept)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [References](#references)

## Quick Start

<!-- THIS IS A REMOVABLE SECTION -->

Starting new?
[Use this template to generate the repository](https://github.com/dogokit/dogokit-remix/generate).

Clone?

```sh
git clone git@github.com:dogokit/dogokit-remix.git
```

Use `pnpx` or `pnpm dlx`?

```sh
pnpx create-remix@latest --template dogokit/dogokit-remix
```

Once decided to use this, in order to get the latest
[README docs](https://github.com/dogokit/dogokit-remix/blob/main/README.md) possible, replace and
remove all explanation in here except the [Setup](#setup) section.

This is a template kit, not a blank repo generator. Customize it based on the actual application
needs. Make sure to first explore to understand, rename, and replace the contents along the way.

## Goal

<!-- THIS IS A REMOVABLE SECTION -->

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

## Prerequisites

Before using this template, you should already understand and have experience with:

- CLI/Terminal
- HTML
- CSS
- JavaScript
- Node.js
- TypeScript
- React

## Concept

<!-- THIS IS A REMOVABLE SECTION -->

Some reasons for making and using this template kit.

- Create a new [Remix](https://remix.run) app or existing one with multiple features quickly
- Setup commonly used development and production parts
  - With [pnpm](https://pnpm.io) by default
- UI components and styles
  - Light and dark mode theme
  - Styling with [Tailwind CSS](https://tailwindcss.com) and [Radix UI](https://radix-ui.com)
  - Bundled with [shadcn UI](https://ui.shadcn.com)
  - Icon retrieval either with [Iconify](https://iconify.design) or manual import
- Database with [Prisma ORM](https://prisma.io)
  - Default for [PostgreSQL](https://postgresql.org) on [Neon](https://neon.tech)
  - Option for [MySQL](https://mysql.com) on [PlanetScale](https://planetscale.com)
  - Run local development database instance as a container with [Docker](https://docker) and
    [Docker Compose](https://docs.docker.com/compose)
- Auth (authentication and authorization) built-in
  - With [Remix Auth](https://github.com/sergiodxa/remix-auth) using various strategies: Form and
    OAuth with 3rd party services
- Various code and utilities
  - Environment variables check with [Zod](https://zod.dev) and znv
  - Date and time, encryption, metadata, redirect route, placeholder, sitemap, string functions,
    timer delay, URL, etc
- Code quality with [Prettier](https://prettier.io), [ESLint](https://eslint.org),
  [Stylelint](https://stylelint.io), [Commitlint](https://commitlint.js.org)

Later:

- Sending transactional email with [React Email](https://react.email) and
  [Resend](https://resend.com)
- Testing with [Vitest](https://vitest.dev) and [Playwright](https://playwright.dev)
- Commands with `dogokit` CLI or `@dogokit/cli`

## Tech Stack

<!-- THIS IS A REMOVABLE SECTION -->

The main prerequisites to learn, understand, and use with the stack. See the complete and
categorized list in the [guide to tech stack](./docs/GUIDE_STACK.md) including things to consider to
use later and won't use at all.

(Architecture diagram can help later on here)

- [Remix](https://remix.run)
- [React](https://react.dev)
- [TypeScript](https://typescriptlang.org)
- [Node.js](https://nodejs.org)
- [pnpm](https://pnpm.io)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://radix-ui.com)
- [Iconify](https://iconify.design)
- [Prisma ORM](https://prisma.io)
- [MySQL](https://mysql.com)
- [Docker](https://docker.com) and [Docker Compose](https://docs.docker.com/compose)

## Setup

### Dependencies

Use [pnpm](https://pnpm.io) to improve productivity and replace npm, so make sure
[pnpm is installed](https://pnpm.io/installation#using-npm):

```sh
npm i -g pnpm
```

To run the app locally, make sure the project's local dependencies are installed:

```sh
pnpm install
```

This also run the `postinstall` script from `package.json` which by default run `prisma generate`.

> Note: Not using Bun yet as there are still some issues.

### Prisma Client Generation

By default installing the modules is also running the `postinstall` script that generate the Prisma
Client (`@prisma/client`) for it to be used in the app.

If it isn't generated or need to generate manually, run:

```sh
pnpm db:gen
# prisma generate
```

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

### Environment Variables

Create the `.env` file from `.env.example`. This is the one for local development, not production

```sh
cp -i .env.example .env
```

Configure the required environment variables if on local, otherwise in the project settings on other
environments.

If necessary, create the `.env.production` for production access. Adjust accordingly if need for
`staging`, `test`, etc. Be careful to change the `APP_URL` on different domains and subdomains.

```sh
cp -i .env.example .env.production
```

Required:

- `APP_URL`: For example, `http://localhost:3000`
- `SESSION_SECRET`: For example, `the_secret_text`. Anything goes, but better to generate a random
  string using `openssl rand -base64 32` on the terminal or put any long random text.
- `DATABASE_URL`: For example, `mysql://user:password@localhost:3306/dogokit`. Continue to read the
  Database Setup.

Optional:

- `NODE_ENV`: For example, `development`
- `*_CLIENT_ID` and `*_CLIENT_SECRET`: For OAuth related,
  [check Guide: OAuth](./docs/GUIDE_OAUTH.md)

#### Database Setup

Prisma ORM is used to communicate with the database easily.

For the database, either choose to use MySQL or PostgreSQL (relational database) from local system,
Docker container, services like [PlanetScale](https://planetscale.com) (MySQL) or
[Neon](https://neon.tech) (PostgreSQL).

If prefer using Docker and Docker Compose for local development,
[follow this guide on database](./docs/GUIDE_DATABASE.md).

The app is configured primarily to be deployed using PlanetScale. Because of that, the migration
files are not needed. Therefore, push the schema directly there. The migration process will be
handled through its [deploy requests](https://planetscale.com/docs/concepts/deploy-requests).

This repo template does not recommend MongoDB (document database), although Prisma has a stable
support for it. The database provider can still be changed, and the schema and databaase operations
might need to adapt.

#### MySQL Database with PlanetScale

To start quickly, create a [PlanetScale](https://planetscale.com) account to have a MySQL instance
for development and production. After the database has been created, "Get the connection string",
select "Prisma", then copy the full `DATABASE_URL`.

> Keep in mind the free plan only allow for 1 database. So either later keep it, delete it when
> unused, or upgrade the plan. There's also a verification with a payment card, even though it's
> still free to start.

Also read:

- [Prisma with PlanetScale](https://prisma.io/docs/guides/database/planetscale)
- [PlanetScale with Prisma](https://planetscale.com/docs/prisma/prisma-quickstart)

### Database Operations

Sync between Prisma schema and the database directly, by making schema changes with
`prisma db push`, which can be done regularly while updating the models:

```sh
pnpm db:push
# prisma db push
```

> Note: Only need to push the schema in development. No need for migration files.

Even with local development without PlanetScale, pushing the schema directly is still okay when in
development or
[prototyping the schema](https://prisma.io/docs/concepts/components/prisma-migrate/db-push). After a
success push, then it will automatically run `prisma generate`.

Create `users.ts` in `prisma/credentials` folder with the format below. Can focus on certain users
who want to be able to access in development, so it doesn't have to be everyone.

```ts
export const dataCredentialUsers = [
  {
    fullname: "Example",
    username: "example",
    nickname: "Dogo",
    email: "example@example.com",
    password: "exampleexample",
    roleSymbol: "ADMIN",
  },
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

If familiar with deploying node applications, the built-in Remix app server is production-ready.
Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

### Development

Finally, develop the app while running the development server:

```sh
pnpm dev
# remix dev --manual
```

Open <http://localhost:3000> and it's ready!

## What's Next?

<!-- THIS IS A REMOVABLE SECTION -->

Develop the app as usual, the Remix way.

Read the [guide to codebase](./docs/GUIDE_CODEBASE.md) and [guide steps](./docs/GUIDE_STEPS.md) to
learn more about the setup.

### Change the Contents

- Arrange and remove components as needed.
- Find and replace various texts, especially the word Dogokit.

### Change Theme Colors

Use [`kiliman/shadcn-custom-theme`](https://github.com/kiliman/shadcn-custom-theme) to generate
shadcn UI CSS variables with Tailwind CSS colors.

For example:

```sh
pnpx shadcn-custom-theme primary=indigo secondary=blue accent=violet gray=neutral
```

### Setup some services

- Image upload with [Uploadcare](https://uploadcare.com)
  - `UPLOADCARE_PUBLIC_KEY`, `UPLOADCARE_SECRET_KEY`
- Transactional email with [Resend](https://resend.com)
  - `RESEND_API_KEY`
- Product analytics with [Posthog](https://posthog.com)
  - `POSTHOG_KEY`

### Subscribe for the status of the services

- [Vercel Status](https://vercel-status.com)
- [PlanetScale Status](https://planetscalestatus.com)
- [Uploadcare Status](https://status.uploadcare.com)
- [Resend Status](https://resend-status.com)

## References

<!-- THIS IS A REMOVABLE SECTION -->


### Used By

- [🐾 Allnimal](https://allnimal.com)
  - [🐻 Bearmentor](https://bearmentor.com)
  - [🐱 Catamyst](https://catamyst.com)
  - [🐶 Dogokit](https://dogokit.allnimal.com)

## Authors

Originally created by [@mhaidarhanif](https://github.com/mhaidarhanif) in 2023, from the 🐾 Allnimal group (🐻 Bearmentor, 🐱 Catamyst, 🐶 Dogokit)

---

2024 ©️ 🐶 Dogokit
