import type { MaybeNumber } from '@dlovely/core/number/judge'
import type { IsNever } from '@dlovely/core/utils/judge'
import type { Review, UnionToIntersection } from '@dlovely/core/utils/operator'
import type { OmitNullable } from './pick'

/** 从对象中提取指定键值对 */
export const pickObject = /*#__PURE__*/ <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Review<Pick<T, K>> => {
  const result = {} as any
  for (const key of keys) {
    result[key] = obj[key]
  }
  return result
}
/** 从对象中排除指定键值对 */
export const omitObject = /*#__PURE__*/ <T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Review<Omit<T, K>> => {
  const result = { ...obj } as any
  for (const key of keys) Reflect.deleteProperty(result, key)
  return result
}
/** 创建一个函数，用于从对象中排除指定键值对 */
export const createOmitObject =
  /*#__PURE__*/


    <K extends string>(...keys: K[]) =>
    <T extends object>(obj: T): Review<Omit<T, K>> => {
      const result = { ...obj }
      for (const key of keys) Reflect.deleteProperty(result, key)
      return result as any
    }

/** 合并多个对象，对象类型也合并 */
export const mergeObject = /*#__PURE__*/ <T extends readonly object[]>(
  ...obj: T
): UnionToIntersection<OmitNullable<T[number]>> => Object.assign({}, ...obj)
/** 扩展一个对象，对象类型一致 */
export const expandObject = /*#__PURE__*/ <T extends object>(source: T, ...obj: NoInfer<T>[]): T =>
  Object.assign(source, ...obj)

export const diffObject = /*#__PURE__*/ <From extends object, To extends object>(
  from: From,
  to: To
) => {
  const changed = [] as any
  for (const [key, value] of Object.entries(to)) {
    if (!(key in from)) {
      changed.push([key, value])
      continue
    }
    const old_value = from[key as keyof From & keyof To]
    if (typeof old_value === 'object' && old_value !== null)
      if (JSON.stringify(old_value) === JSON.stringify(value)) continue
    if (Object.is(value, old_value)) continue
    changed.push([key, value])
  }
  return Object.fromEntries(changed) as To
}

export type RequiredWith<T extends {}, W extends keyof T> = Review<
  Required<Pick<T, W>> & Omit<T, W>
>
export type RequiredWithout<T extends {}, W extends keyof T> = Review<
  Required<Omit<T, W>> & Pick<T, W>
>
export type PartialWith<T extends {}, W extends keyof T> = Review<Partial<Pick<T, W>> & Omit<T, W>>
export type PartialWithout<T extends {}, W extends keyof T> = Review<
  Partial<Omit<T, W>> & Pick<T, W>
>
export type ReadonlyWith<T extends {}, W extends keyof T> = Review<
  Readonly<Pick<T, W>> & Omit<T, W>
>
export type ReadonlyWithout<T extends {}, W extends keyof T> = Review<
  Readonly<Omit<T, W>> & Pick<T, W>
>

export type ValueOf<T extends {}> = T[keyof T]
export type KeyOrValue<T extends {}> = keyof T | ValueOf<T>
export type MakeValueToArray<T extends {}> = { [P in keyof T]: T[P][] }

type _ArrToObj<
  Raw extends unknown[],
  Cache extends 1[] = [],
  Result extends {} = {},
> = Raw extends [infer Head, ...infer Tail]
  ? _ArrToObj<Tail, [...Cache, 1], Result & { [P in Cache['length']]: Head }>
  : IsNever<Raw[number]> extends true
    ? Result
    : Result & { [key: number]: Raw[number] }
export type ArrToObj<Raw extends object> = Raw extends unknown[] ? _ArrToObj<Raw> : Raw

export type KeyPath<T> = T extends object
  ? ArrToObj<T> extends infer Raw extends object
    ? ValueOf<{
        [K in keyof Raw & MaybeNumber]: KeyPath<Raw[K]> extends infer Result extends MaybeNumber
          ? `${K}` | `${K}.${Result}`
          : `${K}`
      }>
    : never
  : never

export type Get<T, P extends string[]> = P extends []
  ? T
  : P extends [infer Head extends string, ...infer Tail extends string[]]
    ? Head extends keyof T
      ? Get<T[Head], Tail>
      : undefined
    : never
