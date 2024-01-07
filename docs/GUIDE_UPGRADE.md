# Guide: Upgrade

Quick notes on upgrading some parts. Especially with Remix v2 and ESM.

## Upgrade Dependencies with Taze

```sh
pnpm upgrade
# taze -w && taze major -w
```

## Upgrade Remix files

`package.json`:

```json
{
  "type": "module"
}
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "allowJs": true,
    "baseUrl": ".",
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "incremental": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "lib": ["DOM", "DOM.Iterable", "ES2022"],
    "moduleResolution": "Bundler",
    "noUncheckedIndexedAccess": true,
    "noUnusedLocals": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2022",
    "paths": {
      "~/*": ["./app/*"]
    }
  },
  "include": ["remix.env.d.ts", ".eslintrc.cjs", "**/*.ts", "**/*.tsx", "**/*.cjs", "**/*.mjs"],
  "exclude": ["node_modules"]
}
```

Starting with `isbot` v4:

```ts
// entry.server.ts

import { isbot } from "isbot"

export default function handleRequest(
  request: Request,
  // ...
) {
  return isbot(String(request.headers.get("user-agent")))
  // ...
}
```

## Upgrade Tailwind CSS

`tailwind.config.ts`:

```ts
import defaultTheme from "tailwindcss/defaultTheme"

import { type Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    // ...
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config
```

Make sure `postcss.config.js` use `export default`:

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## Upgrade Day.js

```ts
import dayjs from "dayjs"
import pluginName from "dayjs/plugin/pluginName.js"
```

## Upgrade react-icons

```ts
import { AbIconName } from "react-icons/ab/index.js"
```
