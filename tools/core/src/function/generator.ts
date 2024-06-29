import type { GenOptions } from '@dlovely/core/utils/generator'

/**
 * 函数生成器
 *
 * 生成一个函数，该函数根据传入的选项生成一个生成器函数
 *
 * @internel
 */
export const genFunctionWith = /*#__PURE__*/ <
  Factory extends (options: GenOptions<any>) => Function,
>(
  options: GenFunctionOptions<Factory>
) => {
  const { cache = true, factory } = options
  if (!cache) return factory
  const bucket = new Map<string, any>()
  return (options => {
    const cache = options?.cache ?? true
    if (!cache) return factory(options)
    const key = JSON.stringify(options)
    let result = bucket.get(key)
    if (!result) bucket.set(key, (result = factory(options)))
    return result
  }) as Factory
}

/**
 * 函数生成器生成选项
 *
 * @internel
 */
export interface GenFunctionOptions<Factory extends (options: GenOptions<any>) => Function>
  extends Omit<GenOptions, 'default'> {
  factory: Factory
}
