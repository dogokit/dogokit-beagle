# Guide: Tech Stack

Aim to prioritize open source option, free-tier, or freemium.

Legends:

- 🧰 = required or should not be changed
- 🎉 = 3rd party service or platform
- 🧩 = optional or interchangeable
- 💠 = available as open source
- 🚧 = still in development or not available

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
- [Iconify](https://iconify.design): Icon set 🧰
- [Icones](https://icones.js.org): Icon search 💠
- [shadcn UI](https://ui.shadcn.com): Styled interactive components and theming
  🧩💠
- [Tremor](https://tremor.so): Styled dashboard components 🧩💠
- [React Email](https://react.email): Email rendering components 🧩💠
- [TanStack Table](https://tanstack.com/table): Unstyled table grid component
  🚧🧩💠

## Form Handling and Data Validation

- [Conform](https://conform.guide): Form handling 🧰💠
- [Zod](https://zod.dev): Data validation 🧰💠
  - [Zodix](https://github.com/rileytomasek/zodix) 🧩💠
  - [zod-form-data](https://npmjs.com/package/zod-form-data) 🧩💠

## Database and ORM

- [Prisma ORM](https://prisma.io): Database ORM (Object Relational Mapping) 🧰💠
- [MySQL](https://mysql.com): Database management system (DBMS) 🧩
- [PlanetScale](https://planetscale.com): MySQL-compatible serverless database
  platform 🧩🎉

## Auth Provider

- [Remix Auth](https://github.com/sergiodxa/remix-auth) 🧰💠

## Tools: Code Quality

- [Prettier](https://prettier.io): Code formatter 🧰💠
- [ESLint](https://eslint.org): Code linter 🧰💠
- [Stylelint](https://stylelint.io): Styling linter 🧰💠
- [Markdownlint](https://github.com/DavidAnson/markdownlint): Markdown linter
  🧰💠

## Tools: Deployment

- [Vercel](https://vercel.com) 🧰🧩🎉

Alternatives:

- [Fly](https://fly.io) 🧩🎉
- [Render](https://render.com) 🧩🎉
- [Railway](https://railway.app) 🧩🎉
- [Google Cloud](https://cloud.google.com) 🧩🎉
- [Amazon Web Services (AWS)](https://aws.amazon.com) 🧩🎉

## Tools: Domain and DNS and SSL/TLS

- [Cloudflare](https://cloudflare) 🧩🎉
  - [Cloudflare DNS](https://cloudflare.com/application-services/products/dns)
  - [Domain Registrar](https://cloudflare.com/products/registrar)

## Tools: Environment Variable/Secret

- [Doppler](https://doppler.com) 🧩🎉
- [Dotenv](https://dotenv.org) 🧩🎉

## Tools: Analytics

- [Vercel Analytics](https://vercel.com/docs/concepts/analytics) 🧩🎉
  - Enable it on your Vercel projects dashboard
- [Posthog](https://posthog.com): product platform and data tools 🧩🎉💠
- [Jitsu](https://jitsu.com): data pipeline and ingestion 🚧🧩🎉💠

## Tools: Image

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

## Tools: Video

- [Mux](https://mux.com): video streaming and management 🚧🧩🎉

## Tools: Transactional Email 🚧

- [Resend](https://resend.com) 🚧🧩🎉

Alternatives:

- [Mailjet](https://mailjet.com) 🚧🧩🎉
- Postmark

## Tools: Marketing Email 🚧

- [ConvertKit](https://convertkit.com) 🚧🧩🎉
- [Bento](https://bentonow.com) 🚧🧩🎉

## Tools: Cache and Rate Limiter

- [Upstash](https://upstash.com) 🚧🧩🎉

## Tools: Payment 🚧

- [Lemon Squeezy](https://lemonsqueezy.com) 🚧🧩🎉
- [Paddle](https://paddle.com) 🚧🧩🎉
- [Stripe](https://stripe.com) 🚧🧩🎉
  - [Tier](https://tier.run): Pricing as Code 🚧🧩🎉

## Tools: Testing 🚧

- [Vitest](https://vitest.dev) 🚧🧩💠
  - [Jest](https://jestjs.io)
- [Testing Library](https://testing-library.com) 🚧🧩💠
  - [React Testing Library](https://testing-library.com)
- [Mock Service Worker (MSW)](https://msw.io) 🚧🧩💠
- [Playwright](https://playwright.dev) 🚧🧩💠
  - [Cypress](https://cypress.io)
- [Ladle](https://ladle.dev) 🚧🧩

## Tools: Container

- [Docker](http://www.docker.com) 🧩💠
- [Docker Compose](https://docs.docker.com/compose) 🧩💠
- [Docker Hub](https://hub.docker.com) 🚧🧩💠

## Tools: Credentials

If you work as a team, it's recommended to use either of these as secrets
management platform to share the environment variables.

So you can optionally use `.env` file. If you need to share quickly
[EnvShare](https://envshare.dev) is good.

- [Doppler](https://doppler.com)
- [Dotenv](https://dotenv.org)

## Tools: Code Review

- [Graphite](https://graphite.dev): Stacking tool to ship code faster
- [Vercel Pro](https://vercel.com/docs/concepts/payments-and-billing/pro): to
  make code review with preview deployments easier.

---

## Don't Use These

- styled-components, @emotion, Stitches, Chakra UI, MUI, etc
- TanStack/React Query, SWR, Axios, etc
- Redux, Zustand, Jotai, XState, etc

---

## Extra Tech Stack

Although these are not included, if you need a separate backend/server/service,
here are the recommendations:

### REST API

- [NestJS](https://nestjs.com)
  - [Express](https://expressjs.com)
  - [Fastify](https://fastify.io)

### GraphQL

- [GraphQL](https://graphql.org)
- [GraphQL Yoga](https://github.com/dotansimha/graphql-yoga)
  - [Express](https://expressjs.com)
- [Pothos](https://github.com/hayes/pothos)

### tRPC

- [tRPC](https://trpc.io)
