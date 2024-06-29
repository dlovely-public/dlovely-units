import { isValidateArray } from '@dlovely/core/array/judge'
import { genFunctionWith } from '@dlovely/core/function/generator'
import { isValidateObject } from '@dlovely/core/object/judge'
import type { GenOptions } from '@dlovely/core/utils/generator'
import { isFalsy } from '@dlovely/core/utils/judge'

/** 生成一个布尔值生成器 */
export const genBooleanWith = genFunctionWith({
  cache: true,
  factory<const Default = undefined>(options?: GenBooleanOptions<Default>) {
    let {
      default: de,
      strict = false,
      zero = strict,
      nan = strict,
      empty_string = strict,
      empty_object = strict,
      empty_array = strict,
    } = options ?? {}
    return (raw?: unknown): boolean | Default => {
      if (isFalsy(raw)) return de!
      if (zero && raw === 0) return false
      if (nan && Number.isNaN(raw)) return false
      if (empty_string && raw === '') return false
      if (empty_object || empty_array) {
        if (typeof raw !== 'object') return true
        if (empty_array && !isValidateArray(raw)) return false
        if (empty_object && !isValidateObject(raw)) return false
      }
      return true
    }
  },
})
export interface GenBooleanOptions<Default = undefined> extends GenOptions<Default> {
  /** 严格模式，开启后其余判断全默认启用 */
  strict?: boolean
  /** `0`是否判断为false */
  zero?: boolean
  /** `NaN`是否判断为false */
  nan?: boolean
  /** `''`是否判断为false */
  empty_string?: boolean
  /** `{}`是否判断为false */
  empty_object?: boolean
  /** `[]`是否判断为false */
  empty_array?: boolean
}

/** 一般布尔值生成器 */
export const genBoolean = /*#__PURE__*/ genBooleanWith()
/** 严格布尔值生成器 */
export const genBooleanStrict = /*#__PURE__*/ genBooleanWith({ strict: true })
