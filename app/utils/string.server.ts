import util from "util"

export function debugCode(code: any, isShown: boolean = true) {
  // eslint-disable-next-line node/no-process-env
  if (process.env.NODE_ENV !== "development" || isShown !== true) return null
  console.info(util.inspect(code, false, null, true))
}
