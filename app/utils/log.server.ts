import util from 'util'
import { parsedEnv } from 'env'

export function logServer(code: unknown, isShown = true) {
	if (parsedEnv.NODE_ENV !== 'development' || isShown !== true) return null
	console.info(util.inspect(code, false, null, true))
}
