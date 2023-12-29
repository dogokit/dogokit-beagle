import { unstable_vitePlugin as remix } from "@remix-run/dev"
import { installGlobals } from "@remix-run/node"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

/**
 * Remix Plugin for Vite Config
 *
 * Build Command: `pnpm build`
 * Output Directory: `build/client`
 * Install Command: `pnpm install`
 * Development Command: `pnpm dev`
 */

installGlobals()

export default defineConfig({
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
    }),
    tsconfigPaths(),
  ],
})
