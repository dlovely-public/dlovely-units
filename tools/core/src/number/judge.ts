import type { IsEqual } from '@dlovely/core/utils/judge'

export type IsNumber<T> = IsEqual<T, number>
export type MaybeNumber = number | string

/** 判断一个值是否为合法数字 */
export const isValidateNumber = /*#__PURE__*/ (num: unknown): num is number => {
  if (typeof num !== 'number') return false
  return !Number.isNaN(num)
}
