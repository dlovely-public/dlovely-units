import type { MaybeFunction } from './judge'

/** 执行一个可能存在的函数，如果不是函数则直接返回 */
export const executeFunction = /*#__PURE__*/ <T, Params extends unknown[] = []>(
  fn: MaybeFunction<T, Params>,
  ...args: Params
): T => (typeof fn === 'function' ? fn(...args) : fn)
