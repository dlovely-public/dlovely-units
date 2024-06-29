import { genFunctionWith } from '@dlovely/core/function/generator'
import type { GenOptions } from '@dlovely/core/utils/generator'
import { isFalsy } from '@dlovely/core/utils/judge'
import { isValidateNumber } from './judge'

/** 通过配置选项构建一个数字生成器 */
export const genNumberWith = /*#__PURE__*/ genFunctionWith({
  cache: true,
  factory<const Default = undefined>(options?: GenNumberOptions<Default>) {
    const { default: de, interger, positive = true, negative = true, zero = true } = options ?? {}
    return (raw?: unknown): number | Default => {
      if (isFalsy(raw)) return de!
      let result = Number(raw)
      if (!isValidateNumber(result)) return de!

      if (interger) {
        if (typeof interger === 'boolean') result = Math.round(result)
        else if (interger > 0) result = Math.ceil(result)
        else result = Math.floor(result)
      }

      if (!positive && result > 0) return de!
      if (!negative && result < 0) return de!
      if (!zero && result === 0) return de!

      return result
    }
  },
})
/** 数字生成器生成选项 */
export interface GenNumberOptions<Default = undefined> extends GenOptions<Default> {
  /**
   * 是否对生成的数字进行取整
   *
   * - `undefined | false` 不取整
   * - `1` 向上取整
   * - `-1` 向下取整
   * - `true` 四舍五入
   */
  interger?: boolean | -1 | 1
  /** 是否保留正数 */
  positive?: boolean
  /** 是否保留负数 */
  negative?: boolean
  /** 是否保留`0` */
  zero?: boolean
}

/** 非`NaN`数字生成器 */
export const genNumber = /*#__PURE__*/ genNumberWith()
/** 整数数字生成器(向下取整) */
export const genInteger = /*#__PURE__*/ genNumberWith({ interger: -1 })
/** 自然数数字生成器(向下取整) */
export const genNaturalNumber = /*#__PURE__*/ genNumberWith({
  default: 0,
  interger: -1,
  negative: false,
})
