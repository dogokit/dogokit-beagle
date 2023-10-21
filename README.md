# 🐶 Dogokit with 💿 Remix

The official Remix web app kit by [🐶 Dogokit](https://dogokit.com) team.

## Steps

[Read the guide steps](./GUIDE_STEPS.md) about this repo setup.

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
