# [🐶 Dogokit with 💿 Remix](https://dogokit.com/remix)

The main Remix web app template kit by [🐶 Dogokit](https://dogokit.com) team.

> 🚧 This template kit is still in early and active development

Check out:

- Web: <https://dogokit.com/remix>
- Repo: <https://github.com/dogokit/dogokit-remix>

## Concept

This template kit website allow to:

- [x] Create a new [Remix](https://remix.run) app with multiple features quickly
- [x] Help existing Remix app development
- [x] Setup commonly used development and production parts
- [x] Code quality with Prettier, ESLint, Stylelint, Commitlint
- [x] UI components and styles with Tailwind CSS and Radix UI
- [x] Database with Prisma ORM and MySQL on PlanetScale
- [ ] Testing with Vitest and Playwright
- [ ] Provide various code and utilities
- [ ] Scripts with `dogokit` CLI or `@dogokit/cli`

## Steps

Read the [guide kit](./docs/GUIDE_KIT.md) and
[guide steps](./docs/GUIDE_STEPS.md) about this repo setup.

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
- Remix Auth
- MySQL
- PlanetScale
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

If familiar with deploying node applications, the built-in Remix app server is
production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`

## References

### Used by

- [🐾 Allnimal](https://allnimal.com)
- [🐻 Bearmentor](https://bearmentor.com)
- [🐱 Catamyst](https://catamyst.com)
- [🐶 Dogokit](https://dogokit.com)
