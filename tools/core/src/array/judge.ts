export const { isArray } = Array

/** 判断是否为合法数组 */
export const isValidateArray = /*#__PURE__*/ (arr: unknown): arr is any[] => {
  if (!isArray(arr)) return false
  return arr.length > 0
}

export type MaybeArray<T> = T | T[]
