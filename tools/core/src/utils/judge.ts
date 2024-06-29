/** 判断是否为严格假值 */
export const isFalsy = /*#__PURE__*/ (value?: unknown): value is null | undefined =>
  value === null || typeof value === 'undefined'
/** 判断是否为严格真值 */
export const isTruthy = /*#__PURE__*/ <T>(value?: T): value is T & {} =>
  value !== null && typeof value !== 'undefined'

/**
 * 判断两个类型是否相同
 *
 * 该类型会将any视作与其他类型相同，可使用`IsEqualStrict`进行严格判断
 */
export type IsEqual<L, R> = [L] extends [R] ? ([R] extends [L] ? true : false) : false
/**
 * 严格判断两个类型是否相同
 *
 * 该类型会将object视作与{}不同，可使用`IsEqual`进行宽泛判断
 */
export type IsEqualStrict<L, R> =
  (<T>() => T extends L ? 1 : 2) extends <T>() => T extends R ? 1 : 2 ? true : false
/** 判断类型是否处于包含关系 */
export type IsContain<L, R> = [R] extends [L] ? true : false

/** 判断是否全部为true */
export type JudgeAll<V extends boolean[]> = IsEqual<V[number], true>
/** 判断是否不全为true */
export type JudgeNotAll<V extends boolean[]> = IsContain<V[number], false>
/** 判断是否存在true */
export type JudgeSome<V extends boolean[]> = IsContain<V[number], true>
/** 判断是否没有false */
export type JudgeNone<V extends boolean[]> = IsEqual<V[number], false>

export type IsNever<Raw> = IsEqualStrict<Raw, never>
export type IsVoid<Raw> = IsEqualStrict<Raw, void>
export type IsUndefined<Raw> = IsEqualStrict<Raw, undefined>
export type IsNull<Raw> = IsEqualStrict<Raw, null>
export type IsAny<Raw> = IsEqualStrict<Raw, any>

export type IsFalsy<Raw> = JudgeSome<[IsNever<Raw>, IsVoid<Raw>, IsUndefined<Raw>, IsNull<Raw>]>
