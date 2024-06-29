import { isArray } from '@dlovely/core/array/judge'

export const isObject = /*#__PURE__*/ (val: unknown): val is Record<any, any> => {
  return val !== null && typeof val === 'object' && !isArray(val)
}

/** 判断是否为合法对象 */
export const isValidateObject = /*#__PURE__*/ (arr: unknown): arr is Record<any, any> => {
  if (!isObject(arr)) return false
  return Object.keys(arr).length > 0
}

export type MaybeObject<T, Key extends PropertyKey> = T | { [K in Key]: T }
export type MaybeObjectKey<T extends object, Key extends keyof T> = T | T[Key]
