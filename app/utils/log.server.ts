import util from "util"

import { parsedEnv } from "~/utils/env.server"

export function logServer(code: unknown, isShown = true) {
	if (parsedEnv.NODE_ENV !== "development" || isShown !== true) return null
	console.info(util.inspect(code, false, null, true))
}
