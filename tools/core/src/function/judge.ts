import type { BaseType } from '@dlovely/core/utils/basic'

export type NotFunction = BaseType | object
export type MaybeFunction<T, Params extends unknown[] = []> =
  | (T & NotFunction)
  | ((...args: Params) => T)
