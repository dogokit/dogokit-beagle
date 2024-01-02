# Guide: Upgrade

Quick notes on upgrading some parts. Especially with Remix v2 and ESM.

## Upgrade Dependencies with Taze

```sh
pnpm upgrade
# taze -w && taze major -w
```

## Upgrade Tailwind CSS

`tailwind.config.ts`:

```ts
import { type Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

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
