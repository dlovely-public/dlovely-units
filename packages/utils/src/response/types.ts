import type { BuiltInType } from '@dlovely/core/utils/basic'
import type { Review } from '@dlovely/core/utils/operator'

type CircleResponseAs<T extends object> = {
  [K in keyof T]: T[K] extends unknown[] ? T[K] : ResponseAs<T[K]>
}
type ResponseWithoutToJSON<T extends object> = CircleResponseAs<T> & {
  toJSON?: undefined
}
export type ResponseAs<T> =
  Omit<_ResponseFrom<T>, ResponseSymbol> extends infer T
    ? T extends object
      ?
          | ResponseWithoutToJSON<T>
          | {
              toJSON(): ResponseWithoutToJSON<T>
            }
          | (CircleResponseAs<T> & {
              toJSON(): ResponseWithoutToJSON<T>
            })
      : T
    : never

declare const ResponseSymbol: unique symbol
export type ResponseSymbol = typeof ResponseSymbol

type _ResponseFrom<T> = T extends BuiltInType
  ? T
  : T extends object
    ? T extends { [ResponseSymbol]: true }
      ? T
      : T extends { toJSON(): infer U }
        ? _ResponseFrom<U>
        : { [K in keyof T]: _ResponseFrom<T[K]> } & { [ResponseSymbol]: true }
    : T
type _OmitResponseSymbol<T> = T extends object
  ? {
      [K in Exclude<keyof T, ResponseSymbol>]: _OmitResponseSymbol<T[K]>
    }
  : T

export type ResponseFrom<T> =
  _ResponseFrom<T> extends infer T
    ? T extends BuiltInType
      ? T
      : T extends object
        ? Review<_OmitResponseSymbol<T> & { [ResponseSymbol]: true }>
        : T
    : never

export const toJSON = <T>(raw: T): ResponseFrom<T> =>
  raw && typeof raw === 'object' && 'toJSON' in raw && typeof raw.toJSON === 'function'
    ? raw.toJSON()
    : raw

export interface Token {
  value: string
  expire_at: number
}
