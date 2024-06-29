import { isTruthy } from '@dlovely/core/utils/judge'

/**
 * 解构对象数组，生成一个新对象
 *
 * 包含了每个键及其对应值的数组
 */
export const deconstructArray = /*#__PURE__*/ <T extends object>(
  item?: T | null,
  ...items: NoInfer<T | null | undefined>[]
): DeconstructArray<T> => {
  items.unshift(item)
  const result = {} as any
  for (const item of items) {
    if (!isTruthy(item) || typeof item !== 'object') continue
    const keys = Reflect.ownKeys(item) as (keyof T)[]
    for (const key of keys) {
      if (key in result) result[key].push(item[key])
      else result[key] = [item[key]]
    }
  }
  return new Proxy(result, {
    get(target, key, receiver) {
      if (!Reflect.has(target, key)) return []
      return Reflect.get(target, key, receiver)
    },
  }) as any
}
type DeconstructArray<T extends object> = {
  [Key in keyof T]-?: T[Key][]
}

/**
 * 从一组元素中选出首个非空值的元素
 *
 * 若所有元素都为空值，则返回`undefined`
 */
export const mergeArray = /*#__PURE__*/ <T>(...items: T[]): T => {
  for (const item of items) {
    if (isTruthy(item)) return item as T
  }
  return void 0 as T
}

/**
 * 将所有对象浅层合并，达到批量选择非空值元素的目的
 */
export const mergeObjectArray = /*#__PURE__*/ <T extends object>(
  item?: T | null,
  ...items: NoInfer<T | null | undefined>[]
): T => {
  const arr_of_obj = deconstructArray<T>(item, ...items)
  const keys = Reflect.ownKeys(arr_of_obj) as (keyof DeconstructArray<T>)[]
  const result = {} as any
  for (const key of keys) {
    const value = arr_of_obj[key] as any
    result[key] = mergeArray(...value)
  }
  return result
}
