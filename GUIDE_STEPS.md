# Guide: Steps

Steps to redo this repo setup.

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

Follow the next installation steps. Then can install the UI component:

```sh
pnpx shadcn-ui@latest add component-name
```

## TypeScript

## .env

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
