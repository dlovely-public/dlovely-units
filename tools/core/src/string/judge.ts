import type { IsEqual } from '@dlovely/core/utils/judge'

export type IsString<T> = IsEqual<T, string>

/** 判断是否为合法字符串 */
export const isValidateString = /*#__PURE__*/ (raw: unknown): raw is string => {
  if (typeof raw !== 'string') return false
  return !!raw
}
