import { type StartsWith } from '@dlovely/core/string/operator'
import type { IsContain, IsNever } from '@dlovely/core/utils/judge'
import type { Filter, Review } from '@dlovely/core/utils/operator'

export type PickRequired<T extends object> = {
  [P in keyof T as IsContain<T[P], undefined> extends true ? never : P]: T[P]
}
export type PickPartial<T extends object> = {
  [P in keyof T as IsContain<T[P], undefined> extends true ? P : never]: T[P]
}
export type OmitNullable<T extends object> = Review<{
  [P in keyof T as IsNever<Filter<T[P]>> extends true ? never : P]: T[P]
}>

export type PickInternal<T extends object> = Review<{
  [P in keyof T as P extends string ? (StartsWith<P, '_'> extends true ? P : never) : P]: T[P]
}>
export type OmitInternal<T extends object> = Review<{
  [P in keyof T as P extends string ? (StartsWith<P, '_'> extends true ? never : P) : P]: T[P]
}>
