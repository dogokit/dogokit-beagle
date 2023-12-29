import { unstable_vitePlugin as remix } from "@remix-run/dev"
import { installGlobals } from "@remix-run/node"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

/**
 * Remix Plugin for Vite Config
 *
 * Remember to override the Build & Development Settings
 *
 * Build Command: `pnpm build`
 * Output Directory: `build/client`
 * Install Command: `pnpm install`
 * Development Command: `pnpm dev`
 *
 * Because:
 * The server is now compiled into build/server by default.
 * The client is now compiled into build/client by default.
 *
 * https://remix.run/docs/en/main/future/vite#migrate-references-to-build-output-paths
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
