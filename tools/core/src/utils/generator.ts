import type { FalsyStrictType, FalsyType } from './basic'

/** 固定返回void */
export const NOOP = /*#__PURE__*/ () => {}
/** 固定返回false */
export const NO = /*#__PURE__*/ () => false
/** 固定返回true */
export const YES = /*#__PURE__*/ () => true
/** 固定返回直接返回 */
export const DIRECT = /*#__PURE__*/ <T>(arg: T) => arg

export interface GenOptions<Default = undefined> {
  /** 当生成过程中判断不成立时，返回的默认值 */
  default?: Default
  /**
   * 是否使用缓存
   * @default true
   */
  cache?: boolean
}

/** 未经过滤的某类型 */
export type Unfiltered<T> = T | FalsyType
/** 未经严格过滤的某类型 */
export type UnfilteredStrict<T> = T | FalsyStrictType
