# Guide: Stack

Aim to prioritize open source option, free-tier, or freemium.

Legends:

- 🧰 = primary, required, or should not be changed
- 🎉 = 3rd party service or platform
- 🧩 = optional or interchangeable
- 💠 = available as open source
- 🚧 = still in development or not available

Table of Contents:

- [Guide: Tech Stack](#guide-tech-stack)
  - [Core](#core)
  - [Library and Framework](#library-and-framework)
  - [Styling and Components](#styling-and-components)
  - [Form Handling and Data Validation](#form-handling-and-data-validation)
  - [Database and ORM](#database-and-orm)
  - [Auth Provider](#auth-provider)
  - [Code Quality](#code-quality)
  - [Deployment](#deployment)
  - [Domain and DNS and SSL/TLS](#domain-and-dns-and-ssltls)
  - [Image](#image)
  - [Video](#video)
  - [Environment Variable/Secret](#environment-variablesecret)
  - [Analytics](#analytics)
  - [Transactional Email](#transactional-email)
  - [Marketing Email](#marketing-email)
  - [Uptime Monitoring](#uptime-monitoring)
  - [Error Monitoring and Tracking](#error-monitoring-and-tracking)
  - [Background Jobs](#background-jobs)
  - [Cache and Rate Limiter](#cache-and-rate-limiter)
  - [Payment Gateway](#payment-gateway)
  - [Testing](#testing)
  - [Container](#container)
  - [Credentials](#credentials)
  - [Code Review](#code-review)
  - [Don't Use These Stack](#dont-use-these-stack)
  - [Extra Stack](#extra-stack)
    - [REST API](#rest-api)
    - [GraphQL](#graphql)
    - [tRPC](#trpc)

## Core

- [HTML](https://developer.mozilla.org/HTML): Markup language 🧰
- [CSS](https://developer.mozilla.org/CSS): Styling language 🧰
- [JavaScript](https://developer.mozilla.org/JavaScript): Programming language
  🧰
- [Node.js](https://nodejs.org): JavaScript runtime 🧰💠
  - [pnpm](https://pnpm.io): Package manager 🧩💠
- [TypeScript](https://typescriptlang.org): Typed language 🧰💠

## Library and Framework

- [React](https://react.dev): UI library 🧰💠
- [Remix](https://remix.run): Full stack web framework 🧰💠
  - [React Router](https://reactrouter.com): Routing (part of Remix) 🧰

## Styling and Components

- [Tailwind CSS](https://tailwindcss.com): Styling 🧰💠
- [Fontsource](https://fontsource.org): Web fonts 🧰
- [Radix UI](https://radix-ui.com): Unstyled UI components 🧰🧩💠
- [Iconify](https://iconify.design): Icon set component 🧰
  - [Icones](https://icones.js.org): Icon search 🧰💠
- [shadcn UI](https://ui.shadcn.com): Styled interactive components and theming
  🧰🧩💠
- [Tremor](https://tremor.so): Styled dashboard components 🧩💠
- [React Email](https://react.email): Email rendering components 🧰🧩💠
- [TanStack Table](https://tanstack.com/table): Unstyled table grid component
  🚧🧩💠

## Form Handling and Data Validation

- [Conform](https://conform.guide): Form handling 🧰💠
- [Zod](https://zod.dev): Data validation 🧰💠
  - [znv](https://github.com/lostfictions/znv): Type-safe env parsing and
    validation 🧰💠
  - [Zodix](https://github.com/rileytomasek/zodix): Zod utilities for Remix
    loaders and actions 🧩💠
  - [zod-form-data](https://npmjs.com/package/zod-form-data) 🧩💠

## Database and ORM

- [Prisma ORM](https://prisma.io): Database ORM (Object Relational Mapping) 🧰💠
- [MySQL](https://mysql.com): Database management system (DBMS) 🧩
- [PlanetScale](https://planetscale.com): MySQL-compatible serverless database
  platform 🧩🎉

## Auth Provider

- [Remix Auth](https://github.com/sergiodxa/remix-auth) 🧰💠

## Code Quality

- [Prettier](https://prettier.io): Code formatter 🧰💠
- [ESLint](https://eslint.org): Code linter 🧰💠
- [Stylelint](https://stylelint.io): Styling linter 🧰💠
- [Markdownlint](https://github.com/DavidAnson/markdownlint): Markdown linter
  🧰💠

---

Starting here are mostly dominated by 3rd Party Tools, open source or not.

## Deployment

- [Vercel](https://vercel.com) 🧰🧩🎉

Alternatives:

- [Fly](https://fly.io) 🧩🎉
- [Render](https://render.com) 🧩🎉
- [Railway](https://railway.app) 🧩🎉
- [Google Cloud](https://cloud.google.com) 🧩🎉
- [Amazon Web Services (AWS)](https://aws.amazon.com) 🧩🎉

## Domain and DNS and SSL/TLS

- [Cloudflare](https://cloudflare) 🧩🎉
  - [Cloudflare DNS](https://cloudflare.com/application-services/products/dns)
  - [Domain Registrar](https://cloudflare.com/products/registrar)

## Image

Placeholders:

- [Dicebear](http://dicebear.com): Avatar placeholder 🧩🎉💠

Stock Photos:

- [Unsplash](http://unsplash.com): Image placeholder 🚧🧩🎉

Asset Storage and Upload:

- [Uploadcare](https://uploadcare.com): Assets management 🧩🎉
- [ImageKit](https://imagekit.io): Assets management 🚧🧩🎉
- [Cloudinary](https://cloudinary.com): Assets management 🚧🧩🎉
- [UploadThing](http://uploadthing): Upload management 🚧🧩💠

Maps:

- [Mapbox](https://mapbox.com) 🚧🧩💠
- [`mapbox-gl`](https://example.com)
- [`react-map-gl`](https://example.com)

## Video

- [Mux](https://mux.com): video streaming and management 🚧🧩🎉

## Environment Variable/Secret

- [Doppler](https://doppler.com) 🧩🎉
- [Dotenv](https://dotenv.org) 🧩🎉

## Analytics

- [Vercel Analytics](https://vercel.com/docs/concepts/analytics) 🧩🎉
  - Enable it on Vercel projects dashboard
- [Posthog](https://posthog.com): Product platform and data tools 🧩🎉💠
- [Jitsu](https://jitsu.com): Data pipeline and ingestion 🚧🧩🎉💠

## Transactional Email

- [Resend](https://resend.com) 🧰🚧🧩🎉

Alternatives:

- [Mailjet](https://mailjet.com) 🚧🧩🎉
- Postmark

## Marketing Email

- [ConvertKit](https://convertkit.com) 🚧🧩🎉
- [Bento](https://bentonow.com) 🚧🧩🎉

## Uptime Monitoring

- [OpenStatus](https://openstatus.dev)

## Error Monitoring and Tracking

- [Sentry](https://sentry.io)

## Background Jobs

- [Trigger.dev](https://trigger.dev) 🚧🧩🎉

## Cache and Rate Limiter

- [Upstash](https://upstash.com) 🚧🧩🎉

## Payment Gateway

- [Lemon Squeezy](https://lemonsqueezy.com) 🚧🧩🎉
- [Paddle](https://paddle.com) 🚧🧩🎉
- [Stripe](https://stripe.com) 🚧🧩🎉
  - [Tier](https://tier.run): Pricing as Code 🚧🧩🎉

## Testing

- [Vitest](https://vitest.dev) 🚧🧩💠
  - [Jest](https://jestjs.io)
- [Testing Library](https://testing-library.com) 🚧🧩💠
  - [React Testing Library](https://testing-library.com)
- [Mock Service Worker (MSW)](https://msw.io) 🚧🧩💠
- [Playwright](https://playwright.dev) 🚧🧩💠
  - [Cypress](https://cypress.io)
- [Ladle](https://ladle.dev) 🚧🧩

## Container

- [Docker](http://www.docker.com) 🧩💠
- [Docker Compose](https://docs.docker.com/compose) 🧩💠
- [Docker Hub](https://hub.docker.com) 🚧🧩💠

## Credentials

If work as a team, it's recommended to use either of these as secrets management
platform to share the environment variables. So can optionally use `.env` file.

- [Doppler](https://doppler.com)
- [Dotenv](https://dotenv.org)

If need to share quickly, [EnvShare](https://envshare.dev) is good enough.

## Code Review

- [Graphite](https://graphite.dev): Stacking tool to ship code faster
- [Vercel Pro](https://vercel.com/docs/concepts/payments-and-billing/pro): to
  make code review with preview deployments easier.

---

## Don't Use These Stack

- CSS-in-JS solutions such as styled-components, @emotion, Stitches, Chakra UI,
  MUI, etc because already using Tailwind CSS.
- Data fetching and caching library such as TanStack/React Query, SWR, Axios,
  etc because already using Remix loader/action, unless very necessary.
- Redux, Zustand, Jotai, XState, etc because the app is still mostly having a
  server-side state.
- Firebase, Supabase, Auth0, etc because the app is already handling the auth
  with Remix Auth, unless very necessary

---

## Extra Stack

Although these are not included, if need a separate backend/server/service, here
are the recommendations:

### REST API

- [Express](https://expressjs.com)
- [Fastify](https://fastify.io)
- [NestJS](https://nestjs.com)

### WebSocket

- [SocketIO](https://socket.io)

### GraphQL

- [GraphQL](https://graphql.org)
- [GraphQL Yoga](https://github.com/dotansimha/graphql-yoga)
  - [Express](https://expressjs.com)
- [Pothos](https://github.com/hayes/pothos)

### tRPC

- [tRPC](https://trpc.io)
