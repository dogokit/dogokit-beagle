import { type Prisma } from "@prisma/client"
import { type Jsonify } from "@remix-run/server-runtime/dist/jsonify"

export type JsonifyValues<T> = {
  [K in keyof T]: Jsonify<T[K]>
}

export type JsonifyPrisma<T extends (...args: any[]) => any> = JsonifyValues<
  Prisma.PromiseReturnType<T>
>
