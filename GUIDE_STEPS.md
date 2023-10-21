# Guide: Steps

Steps to redo this repo setup.

## Prerequisites

- Code editor such as VS Code
- Terminal app
- Git
- Node.js

## Git

Clone the repo. Preferably with SSH.

```sh
git clone
```

Ignore some files.

```
.gitignore
```

## README

```
README.md
```

## LICENCE

```
LICENSE
```

## Code of Conduct

```
CODE_OF_CONDUCT.md
```

## package.json

Check for the dependencies.

Check the scripts:

- App-related tasks
- Code check
- Code fix
- Other things

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

```
.npmrc
```

## Prettier

Formatter with various plugins.

```
.prettierrc.js
```

## ESLint

Linter with various plugins.

```
.eslintrc.cjs
```

Note that ESLint does not support ESM
[configuration](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file-formats)
at this time.

## Stylelint

```
.stylelintrc
```

## commitlint

```
.commitlintrc
```

## Remix Config

```
remix.config.js
```

To enable `tailwind` and `postcss`.

## TypeScript

```
tsconfig.json
```

## Tailwind CSS & PostCSS

```
tailwind.config.ts
postcss.config.js
```

## Radix UI

No config necessary.

## shadcn UI

Automatically setup Tailwind CSS, PostCSS, and Radix UI.

```sh
pnpx shadcn-ui@latest init
```

Follow the next installation steps. The components are configured in:

```
components.json
```

Then can install the UI component as needed:

```sh
pnpx shadcn-ui@latest add component-name
```

## Icons

shadcn UI install Lucide React icons by default, which can be removed and
replaced.

Use Iconify (`@iconify/react`) to get any popular icons via
[Icônes](https://icones.js.org).

## Fonts

Use [Fontsource](https://fontsource.org) to install the font locally without
using online-required [Google Fonts](https://fonts.google.com).

```

```

## Theme Mode

TBA

## Docker

- On Mac, use OrbStack.
- On Linux, install Docker.
- On Windows, use WSL then install Docker.

## MySQL

TBA

## PlanetScale

TBA

## Environment Variable

```
.env.example
.env
.env.production
```

---

## Extra

Some extra stuffs are below.

## VS Code

- Change workspace color
- Install recommended extensions

## Remix Forge

VS Code extension that allows you to generate configurable Remix code.

[Code-Forge-Net/Remix-Forge](https://github.com/Code-Forge-Net/Remix-Forge)

## Remix Dev Tools

[Code-Forge-Net/Remix-Dev-Tools](https://github.com/Code-Forge-Net/Remix-Dev-Tools)
