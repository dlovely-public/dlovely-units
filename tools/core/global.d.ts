declare global {
  type Unfiltered<T> = import('@dlovely/core/utils/generator').Unfiltered<T>
  type UnfilteredStrict<T> = import('@dlovely/core/utils/generator').UnfilteredStrict<T>

  type MaybeNumber = import('@dlovely/core/number/judge').MaybeNumber
  type MaybeArray<T> = import('@dlovely/core/array/judge').MaybeArray<T>
  type MaybeObject<T, Key extends PropertyKey> = import('@dlovely/core/object/judge').MaybeObject<
    T,
    Key
  >
  type MaybeObjectKey<
    T extends object,
    Key extends keyof T,
  > = import('@dlovely/core/object/judge').MaybeObjectKey<T, Key>
  type MaybeFunction<
    T,
    Params extends unknown[],
  > = import('@dlovely/core/function/judge').MaybeFunction<T, Params>
  type MaybePromise<T> = import('@dlovely/core/promise/judge').MaybePromise<T>
}

export {}
