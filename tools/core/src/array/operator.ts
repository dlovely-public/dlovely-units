import { Venn } from '@dlovely/core/set/venn'
import type { Unfiltered, UnfilteredStrict } from '@dlovely/core/utils/generator'
import { isFalsy, isTruthy } from '@dlovely/core/utils/judge'
import type { Filter, FilterStrict } from '@dlovely/core/utils/operator'
import { isArray, type MaybeArray } from './judge'

/** 过滤掉数组中的`null`和`undefined` */
export const filterStrictArray = /*#__PURE__*/ <T>(arr?: UnfilteredStrict<T>[]): T[] =>
  (arr?.filter(isTruthy) as any) ?? []
/** 过滤掉数组中的假值 */
export const filterArray = /*#__PURE__*/ <T>(arr?: Unfiltered<T>[]): T[] =>
  (arr?.filter(Boolean) as any) ?? []

/** 试图创建一个数组，由原数组过滤后生成，如果结果数组不合法，则返回空 */
export const checkOutArray = /*#__PURE__*/ <T, S extends boolean = false>(
  arr?: T[],
  strict?: S
): (S extends true ? FilterStrict<T> : Filter<T>)[] | undefined => {
  if (isFalsy(arr)) return void 0
  const result = (strict ? filterStrictArray : filterArray)(arr)
  return result.length ? (result as any) : void 0
}

/** 旋转数组 */
export const rotateArray = /*#__PURE__*/ <T>(arr: T[], times = 0): T[] => {
  if (!arr?.length) return []
  if (!times) return [...arr]
  times = times % arr.length
  const header = arr.slice(0, times)
  const body = arr.slice(times)
  return [...body, ...header]
}

/** 读取一个可能的数组，如果不是数组则直接返回，如果是数组则读取指定索引或返回`join()`的结果 */
export const readArray = /*#__PURE__*/ (<T>(arr: MaybeArray<T>, index: number | 'join' = 0) => {
  if (!isArray(arr)) return arr
  switch (index) {
    case 'join':
      return arr.join('')
    default:
      return arr[index]
  }
}) as {
  <T>(arr: MaybeArray<T>, index?: number): T
  (arr: MaybeArray<unknown>, index: 'join'): string
}

/** 对比两个数组，返回增加的值和减少的值 */
export const diffArray = /*#__PURE__*/ <From, To>(from: From[], to: To[]) => {
  const venn = new Venn(from, to)
  const describe = [...venn.left]
  const inscribe = [...venn.right]
  return { inscribe, describe }
}
