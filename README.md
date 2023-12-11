# [🐶 Dogokit Remix](https://dogokit.allnimal.com)

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Remix](https://img.shields.io/badge/Remix-000000?style=flat-square&logo=remix&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Radix UI](https://img.shields.io/badge/Radix_UI-111111?style=flat-square&logo=framer&logoColor=white)
![Prisma ORM](https://img.shields.io/badge/Prisma_ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)
![PlanetScale](https://img.shields.io/badge/PlanetScale-000000?style=flat-square&logo=planetscale&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

> 🚧 Work in Progress

Dogokit Remix is a web app template kit by
[🐶 Dogokit](https://dogokit.allnimal.com) using Remix, React, Tailwind CSS,
Radix UI, Prisma ORM, and more.

Read the latest updates and details on
[dogokit/dogokit-remix](https://github.com/dogokit/dogokit-remix).

The goal is to start and be as productive as possible to ship a web app quickly
with [Remix](https://remix.run) full stack web framework.

It is a highly opinionated collection of application structure, interactive UI
components, software engineering and web development workflow, functionality
hooks and utilities, also integration with 3rd party services.

Check out:

- Web: <https://dogokit.allnimal.com>
- Repo: <https://github.com/dogokit/dogokit-remix>

## Table of Contents

- [Quick Start](#quick-start)
- [Goal](#goal)
- [Concept](#concept)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [References](#references)

## Quick Start

<!-- REMOVABLE SECTION -->

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
[README docs](https://github.com/dogokit/dogokit-remix/blob/main/README.md)
possible, replace and remove all explanation in here except the [Setup](#setup)
section.

This is a template kit, not a blank repo generator. Customize it based on the
actual application needs. Make sure to first explore to understand, rename, and
replace the contents along the way.

## Goal

<!-- REMOVABLE SECTION -->

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

<!-- REMOVABLE SECTION -->

Some reasons for making and using this template kit.

- Create a new [Remix](https://remix.run) app or existing one with multiple
  features quickly
- Setup commonly used development and production parts
  - With [pnpm](https://pnpm.io) by default
- UI components and styles
  - With [Tailwind CSS](https://tailwindcss.com) and
    [Radix UI](https://radix-ui.com)
  - Bundled with [shadcn UI](https://ui.shadcn.com)
  - Icons with [Iconify](https://iconify.design)
  - Light and dark mode theme
- Database with [Prisma ORM](https://prisma.io) and [MySQL](https://mysql.com)
  on [PlanetScale](https://planetscale.com)
  - Run local development database instance as a container with
    [Docker](https://docker) and
    [Docker Compose](https://docs.docker.com/compose)
- Auth (authentication and authorization) built-in
  - With [Remix Auth](https://github.com/sergiodxa/remix-auth) using various
    strategies: Form and OAuth with 3rd party services
- Various code and utilities
  - Environment variables check with [Zod](https://zod.dev) and znv
  - Date and time, encryption, metadata, redirect route, placeholder, sitemap,
    string functions, timer delay, URL, etc
- Code quality with [Prettier](https://prettier.io),
  [ESLint](https://eslint.org), [Stylelint](https://stylelint.io),
  [Commitlint](https://commitlint.js.org)

Later:

- Sending transactional email with [React Email](https://react.email) and
  [Resend](https://resend.com)
- Testing with [Vitest](https://vitest.dev) and
  [Playwright](https://playwright.dev)
- Commands with `dogokit` CLI or `@dogokit/cli`

## Tech Stack

<!-- REMOVABLE SECTION -->

The main prerequisites to learn, understand, and use with the stack. See the
complete and categorized list in the
[guide to tech stack](./docs/GUIDE_STACK.md) including things to consider to use
later and won't use at all.

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

This also run the `postinstall` script from `package.json` which by default run
`prisma generate`.

> Note: Not using Bun yet as there are still some issues.

### Prisma Client Generation

By default installing the modules is also running the `postinstall` script that
generate the Prisma Client (`@prisma/client`) for it to be used in the app.

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

Create the `.env` file from `.env.example`. This is the one for local
development, not production

```sh
cp -i .env.example .env
```

Configure the required environment variables if on local, otherwise in the
project settings on other environments.

If necessary, create the `.env.production` for production access. Adjust
accordingly if need for `staging`, `test`, etc. Be careful to change the
`APP_URL` on different domains and subdomains.

```sh
cp -i .env.example .env.production
```

Required:

- `APP_URL`: For example, `http://localhost:3000`
- `DATABASE_URL`: For example, `mysql://user:password@localhost:3306/dogokit`
- `SESSION_SECRET`: For example, `the_secret_text`

For OAuth related, [check this guide](./docs/GUIDE_OAUTH.md)

#### Database Setup

For the database, either choose to use MySQL or PostgreSQL from local system,
Docker container, services like [PlanetScale](https://planetscale.com) (MySQL)
or [Neon](https://neon.tech) (PostgreSQL).

If prefer using Docker and Docker Compose for local development,
[follow this guide](docs/GUIDE_DATABASE.md).

#### MySQL Database with PlanetScale

To start quickly, create a [PlanetScale](https://planetscale.com) account to
have a MySQL instance for development and production. After the database has
been created, "Get the connection string", select "Prisma", then copy the full
`DATABASE_URL`.

> Keep in mind the free plan only allow for 1 database. So either later keep it,
> delete it when unused, or upgrade the plan. There's also a verification with a
> payment card, even though it's still free to start.

Generate a random string for the `SESSION_SECRET` using
`openssl rand -base64 32` on the terminal or put any long random text.

```sh
DATABASE_URL="mysql://username:password@aws.connect.psdb.cloud/database-name?sslaccept=strict"
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
still okay when in development or
[prototyping the schema](https://prisma.io/docs/concepts/components/prisma-migrate/db-push).
After a success push, then it will automatically run `prisma generate`.

Optionally, create `users.json` in `prisma/credentials` folder with the format
below. Can focus on certain users who want to be able to sign in in development,
so it doesn't have to be everyone.

```json
[
  {
    "fullname": "User Name",
    "username": "username",
    "nickname": "User",
    "email": "user@user.com",
    "password": "useruser",
    "roleSymbol": "ADMIN"
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

Open <http://localhost:3000> and it's ready!

### Customize

<!-- REMOVABLE SECTION -->

#### Change the Contents

- Arrange and remove components as needed.
- Find and replace various texts, especially the word Dogokit.

#### Change Theme Colors

Use
[`kiliman/shadcn-custom-theme`](https://github.com/kiliman/shadcn-custom-theme)
to generate shadcn UI CSS variables with Tailwind CSS colors.

For example:

```sh
pnpx shadcn-custom-theme primary=indigo secondary=blue accent=violet gray=neutral
```

## What's Next?

Develop the app as usual, the Remix way.

Read the [guide to codebase](./docs/GUIDE_CODEBASE.md) and
[guide steps](./docs/GUIDE_STEPS.md) to learn more about the setup.

## References

### Inspirations

Templates:

- [Remix Directory](https://remix.directory)
- [Remix Stacks](https://remix.run/stacks)
  - [💿 Remix Indie Stack](https://github.com/remix-run/indie-stack)
  - [🚀 The Epic Stack by Kent C. Dodds](https://github.com/epicweb-dev/epic-stack)
  - [⏪ Rewinds by M Haidar Hanif](https://rewinds.mhaidarhanif.com/)
  - [Stripe Stack by Daniel Kanem](https://github.com/dev-xo/stripe-stack)
  - [Synthwave Stack by I4O Open Source](https://github.com/i4o-oss/synthwave-stack)
- [shadcn UI](https://github.com/shadcn/ui)
  - [Taxonomy](https://tx.shadcn.com)
- [MakerKit - SaaS Starter Kits based on React](https://makerkit.dev)
- [SaasRock - The One-Man SaaS Framework](https://saasrock.com)
- [T3 Stack by T3 Community / Theo Browne](https://create.t3.gg)
- [neorepo - Remix/Next.js production-ready starter kit](https://neorepo.com)
- [Next SaaS Stripe Starter](https://github.com/mickasmt/next-saas-stripe-starter)
- [Precedent](https://precedent.dev)
- [Reshaped](https://reshaped.so)

Designs:

- [saasui.design](https://saasui.design)
- [saasinterface.com](https://saasinterface.com)
- [Saas UI - The React component library for Startups](https://saas-ui.dev)
- [Rewind-UI - React component library using Tailwind CSS](https://github.com/rewindui/rewindui)
- [MoneyKit](https://moneykit.com)

### General

- [web.dev](https://web.dev)
- [Design System Checklist](https://designsystemchecklist.com)
- [The Web’s Next Transition - Epic Web Dev by Kent C. Dodds](https://epicweb.dev/the-webs-next-transition)
- [Infra I'm Building On In 2023 - T3](https://t3.gg/blog/post/2023-infra)
  - [The Infra That Saved Me From AWS - My 2023 Stack](https://youtube.com/watch?v=v-9AZKp-Ljo)

### Remix

- [Remix Docs](http://remix.run)
- [Remix Blog Tutorial](http://remix.run/docs/en/main/tutorials/blog)
- [Up and Running with Remix - Kent C. Dodds - egghead.io](https://egghead.io/courses/up-and-running-with-remix-b82b6bb6)
- [Build a Fullstack App with Remix and Prisma - Prisma YouTub Playlist](https://youtube.com/watch?v=4tXGRe5CDDg&list=PLn2e1F9Rfr6kPDIAbfkOxgDLf4N3bFiMn)
- [Build a Fullstack App with Remix and Prisma - Prisma Blog](https://prisma.io/blog/fullstack-remix-prisma-mongodb-1-7D0BfTXBmB6r)

### React

- [React](https://react.dev)
- [Rethinking React best practices - Frontend Mastery](https://frontendmastery.com/posts/rethinking-react-best-practices)
- [Bulletproof React - A simple, scalable, and powerful architecture for building production-ready React applications](https://github.com/alan2207/bulletproof-react)

### Tailwind CSS

- [Tailwind CSS](https://tailwindcss.com)
- [Why we use Tailwind CSS as our primary framework | Clean Commit](https://cleancommit.io/blog/why-we-use-tailwind-css-as-our-primary-framework)
- [An Honest Look at Tailwind as an API for CSS | thoughtbot, inc.](https://thoughtbot.com/blog/an-honest-look-at-tailwind-as-an-api-for-css)
- [Styling Best Practices I Use With Tailwind CSS | theodorusclarence.com](https://theodorusclarence.com/blog/tailwindcss-best-practice)

### React with Tailwind CSS Components

- [Tailwind UI](https://tailwindui.com/components) various components
- [shadcn UI](https://ui.shadcn.com) various components
- [RizzUI](https://rizzui.com) various components
- [Tremor](https://tremor.so) dashboard components

### Tech Stack List

- [🐶 Dogokit Stack](https://github.com/dogokit/dogokit-stack)
- [🐶 Dogokit Stack All](https://github.com/dogokit/dogokit-stack-all)

### Used By

- [🐾 Allnimal](https://allnimal.com)
  - [🐻 Bearmentor](https://bearmentor.com)
  - [🐱 Catamyst](https://catamyst.com)
  - [🐶 Dogokit](https://dogokit.allnimal.com)

## Authors

Originally created by [@mhaidarhanif](https://github.com/mhaidarhanif) in 2023,
from the 🐾 Allnimal group (🐻 Bearmentor, 🐱 Catamyst, 🐶 Dogokit)

---

2023 ©️ 🐶 Dogokit
