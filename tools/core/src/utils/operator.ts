import type { BuiltInType, FalsyStrictType, FalsyType } from './basic'
import type { IsContain, IsFalsy } from './judge'

/** 创建默认类型，相当于JS中的`??` */
export type Default<L, R> = IsFalsy<L> extends true ? R : L

/** 过滤某类型 */
export type Filter<T, B = FalsyType> = T extends B ? never : T
/** 严格过滤某类型 */
export type FilterStrict<T, B = FalsyStrictType> = T extends B ? never : T

type _Review<T extends object> = { [P in keyof T]: Review<T[P]> }
/** 重载某类型 */
export type Review<T> = T extends BuiltInType
  ? T
  : T extends Array<infer V>
    ? Array<Review<V>>
    : T extends Map<infer K, infer V>
      ? Map<Review<K>, Review<V>>
      : T extends WeakMap<infer K extends WeakKey, infer V>
        ? WeakMap<Review<K>, Review<V>>
        : T extends Set<infer V>
          ? Set<Review<V>>
          : T extends WeakSet<infer V extends WeakKey>
            ? WeakSet<Review<V>>
            : T extends Promise<infer V>
              ? Promise<Review<V>>
              : T extends PromiseLike<infer V>
                ? PromiseLike<Review<V>>
                : { [P in keyof T]: Review<T[P]> }

export type UndefineToOptional<T extends object> = _Review<
  {
    [K in keyof T as IsContain<T[K], undefined> extends true ? never : K]-?: T[K]
  } & {
    [K in keyof T as IsContain<T[K], undefined> extends true ? K : never]?: T[K]
  }
>
type exp = UndefineToOptional<{
  a: number
  b: string | undefined
  c?: boolean | undefined
  d?: () => void
}>

/** 联合类型 -> 交叉类型 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? Review<I>
  : never

/** 将任意值通过`Object.prototype.toString`转为字符串 */
export const anyToString = /*#__PURE__*/ (raw: unknown) => Object.prototype.toString.call(raw)
