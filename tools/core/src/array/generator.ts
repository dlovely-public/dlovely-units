import { genNaturalNumber } from '@dlovely/core/number/generator'
import { isFalsy } from '@dlovely/core/utils/judge'
import { isArray, type MaybeArray } from './judge'

/** 将非数组结构构建为数组 */
export /*#__PURE__*/ function genArray<T extends unknown>(arr?: MaybeArray<T>): T[] {
  if (isFalsy(arr)) return []
  return isArray(arr) ? arr : [arr]
}

export type ToArray<T> = T extends unknown[] ? T : [T]

/** 构建指定数量元素的数组，数量小于0时构建空数组 */
export /*#__PURE__*/ function genArrayList(count: number, options?: GenArrayOptions) {
  const { from = 0, step = 1, reverser, filter } = options ?? {}
  count = genNaturalNumber(count)
  if (count <= 0) return []
  const result = [] as number[]
  let value = from
  while (count > 0) {
    if (!filter || filter(value)) result.push(value)
    if (reverser) value -= step
    else value += step
    count -= 1
  }
  return result
}

/** 构建到目标为止的数组，目标小于起始值时构建空数组 */
export /*#__PURE__*/ function genArrayLine(to: number, options?: GenArrayOptions) {
  const { from = 0, step = 1, reverser, filter } = options ?? {}
  const result = [] as number[]
  let value = from
  if (reverser)
    while (value >= to) {
      if (!filter || filter(value)) result.push(value)
      value -= step
    }
  else
    while (value <= to) {
      if (!filter || filter(value)) result.push(value)
      value += step
    }
  return result
}

export interface GenArrayOptions {
  /** 起始值 @default 0 */
  from?: number
  /** 步长 @default 1 */
  step?: number
  /** 是否反向添加 */
  reverser?: boolean
  /** 过滤器 */
  filter?: (index: number) => boolean
}

export interface OrderedArray extends Array<number> {
  ordered(): void
  remove(value: number): void
}
/** 创建一个正序数组，用于加速插入与移除元素时的速度 */
export /*#__PURE__*/ function genArrayAsc(raw?: number[]) {
  const array = (raw ?? []) as OrderedArray
  array.ordered = () => array.sort((a, b) => a - b)
  array.remove = (value: number) => {
    let left = 0
    let right = array.length - 1
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (array[mid] < value) left = mid + 1
      else if (array[mid] > value) right = mid - 1
      else {
        array.splice(mid, 1)
        break
      }
    }
  }
  return array
}
/** 创建一个逆序数组，用于加速插入与移除元素时的速度 */
export /*#__PURE__*/ function genArrayDEsc(raw?: number[]) {
  const array = (raw ?? []) as OrderedArray
  array.ordered = () => array.sort((a, b) => b - a)
  array.remove = (value: number) => {
    let left = 0
    let right = array.length - 1
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      if (array[mid] < value) right = mid + 1
      else if (array[mid] > value) left = mid - 1
      else {
        array.splice(mid, 1)
        break
      }
    }
  }
  return array
}
