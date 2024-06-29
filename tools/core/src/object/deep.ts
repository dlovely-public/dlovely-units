import type { BuiltInType } from '@dlovely/core/utils/basic'
import type { Review } from '@dlovely/core/utils/operator'

export type DeepRequired<T extends {}> = Review<{
  [P in keyof T]-?: T[P] extends {} ? DeepRequired<T[P]> : T[P]
}>
export type DeepPartial<T extends {}> = Review<{
  [P in keyof T]?: T[P] extends {} ? DeepPartial<T[P]> : T[P]
}>
export type DeepReadonly<T> = T extends BuiltInType
  ? T
  : T extends Map<infer K, infer V>
    ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
    : T extends ReadonlyMap<infer K, infer V>
      ? ReadonlyMap<DeepReadonly<K>, DeepReadonly<V>>
      : T extends WeakMap<infer K, infer V>
        ? WeakMap<DeepReadonly<K>, DeepReadonly<V>>
        : T extends Set<infer U>
          ? ReadonlySet<DeepReadonly<U>>
          : T extends ReadonlySet<infer U>
            ? ReadonlySet<DeepReadonly<U>>
            : T extends WeakSet<infer U>
              ? WeakSet<DeepReadonly<U>>
              : T extends Promise<infer U>
                ? Promise<DeepReadonly<U>>
                : T extends PromiseLike<infer U>
                  ? PromiseLike<DeepReadonly<U>>
                  : T extends {}
                    ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
                    : Readonly<T>
export type ShallowReadonly<T> = T extends BuiltInType
  ? T
  : T extends Map<infer K, infer V>
    ? ReadonlyMap<K, V>
    : T extends ReadonlyMap<infer K, infer V>
      ? ReadonlyMap<K, V>
      : T extends WeakMap<infer K, infer V>
        ? WeakMap<K, V>
        : T extends Set<infer U>
          ? ReadonlySet<U>
          : T extends ReadonlySet<infer U>
            ? ReadonlySet<U>
            : T extends WeakSet<infer U>
              ? WeakSet<U>
              : T extends Promise<infer U>
                ? Promise<U>
                : T extends PromiseLike<infer U>
                  ? PromiseLike<U>
                  : Readonly<T>
