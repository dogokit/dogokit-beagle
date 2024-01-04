import { type Jsonify } from "@remix-run/server-runtime/dist/jsonify"

export type JsonifyValues<T> = {
  [K in keyof T]: Jsonify<T[K]>
}
