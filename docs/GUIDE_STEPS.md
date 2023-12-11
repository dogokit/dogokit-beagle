# Guide: Steps

> 🚧 WIP

Steps to know, check, or redo.

## Prerequisites

### OS-level

Choose one for each category.

1. Code editor: Vim, VS Code
2. Terminal app: Warp, iTerm
3. Version control: Git
4. JavaScript runtime: Node.js

### Account-level

Choose one for each category.

1. Email: Gmail, Skiff Mail
2. Credential manager: Bitwarden, 1Password
3. Repository: GitHub, GitLab, Bitbucket
4. Deployment: Vercel, Netlify, Render.com, Railway.app, Fly.io
5. Secrets: Doppler, etc

## Git

Initialize or clone the repo. Preferably with SSH URL.

```sh
git clone git@github.com:dogokit/dogokit-remix.git
```

Ignore some files.

```txt
.gitignore
```

## README

```txt
README.md
```

## LICENSE

```txt
LICENSE
```

## Code of Conduct

```txt
CODE_OF_CONDUCT.md
```

## `package.json`

Check for the dependencies.

Check the scripts for:

- App-related tasks
- `check:*`: Code check commands
- `fix:*`: Code fix commands
- `db:*`: Database-related commands

## Node.js Dependencies with pnpm

```sh
npm install -g pnpm
```

```sh
pnpm install
```

Can also check the version updates with `taze`:

```sh
pnpm taze
```

Config to enable some features for pnpm:

```txt
.npmrc
```

## Prettier

Formatter with various plugins.

```txt
.prettierrc.js
```

## ESLint

Linter with various plugins.

```txt
.eslintrc.cjs
```

Note that ESLint does not support ESM
[configuration](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats)
at this time.

## Stylelint

```txt
.stylelintrc
```

## commitlint

```txt
.commitlintrc
```

## TypeScript

```txt
tsconfig.json
```

## Remix Config

```txt
remix.config.js
```

Also to enable `tailwind` and `postcss`.

## Favicons

Use [Real Favicon Generator](https://realfavicongenerator.net).

Remove the `site.webmanifest` file as in Remix it will be handled dynamically.

Use TinyPNG to compress the images.

Configure in Remix `root.tsx`

## Tailwind CSS & PostCSS

```sh
pnpm install -D tailwindcss postcss autoprefixer
pnpm install -D @tailwindcss/typography @tailwindcss/forms tailwindcss-animate
```

```txt
tailwind.config.ts
postcss.config.js
```

## Radix UI

No config necessary.

But if install the packages manually:

```sh
pnpm install @radix-ui/react-slot
```

## shadcn UI

> Skip this if not prefer to use it.

Automatically setup Tailwind CSS, PostCSS, Radix UI, Class Variance Authority,
clsx, Tailwind Merge, and more.

```sh
pnpx shadcn-ui@latest init
```

But if install the packages manually:

```sh
pnpm install class-variance-authority clsx tw-merge
```

Then follow the next installation steps. The components are configured in:

```txt
components.json
```

Then can install the UI component as needed:

```sh
pnpx shadcn-ui@latest add component-name
```

## Progress Bar

...

## Icons

shadcn UI install Lucide React icons by default, which can be removed and
replaced.

Use Iconify (`@iconify/react`) to get any popular icons via
[Icônes](https://icones.js.org).

## Fonts

Use [Fontsource](https://fontsource.org) to install the font locally without
using online-required [Google Fonts](https://fonts.google.com).

```sh
pnpm install @fontsource-variable/font-name
# or
pnpm install @fontsource/font-name
```

## Theme Mode

TBA

## Docker

TBA

## Docker Compose

```txt
docker-compose.yml
```

```sh
docker compose up -d
```

## MySQL on a Docker container

TBA

## MySQL on PlanetScale

TBA

## Environment Variable

```txt
.env.example
```

For local development:

```txt
.env
```

For production copy if needed:

```txt
.env.production
```

## Prisma ORM

```sh
pnpm db:push
pnpm db:reset
pnpm db:generate
pnpm db:seed
pnpm db:studio
pnpm db:docs
```

References:

- [https://planetscale.com/docs/prisma/automatic-prisma-migrations](https://planetscale.com/docs/prisma/automatic-prisma-migrations)

## Prisma Seed Data

Create the credential of users data:

```sh
touch prisma/credential/users.json
```

Then configure it:

```json
[
  {
    "fullname": "Example",
    "username": "example",
    "email": "example@example.com",
    "password": "exampleexample"
  }
]
```

---

## Extra

Some extra stuffs are below.

## VS Code

- Change workspace color
- Install recommended extensions

## Remix Forge

VS Code extension to generate configurable Remix code.

[Code-Forge-Net/Remix-Forge](https://github.com/Code-Forge-Net/Remix-Forge)

## Remix Dev Tools

[Code-Forge-Net/Remix-Dev-Tools](https://github.com/Code-Forge-Net/Remix-Dev-Tools)
