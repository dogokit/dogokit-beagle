import { unstable_vitePlugin as remix } from "@remix-run/dev"
import { defineConfig, loadEnv } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"

export default ({ mode }: { mode: string }) => {
	const env = loadEnv(mode, process.cwd(), "")

	// eslint-disable-next-line node/no-process-env
	process.env = { ...process.env, ...env }

	return defineConfig({
		plugins: [
			remix({
				ignoredRouteFiles: ["**/.*"],
			}),
			tsconfigPaths(),
		],
	})
}
