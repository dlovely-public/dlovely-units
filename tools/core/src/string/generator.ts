import { genFunctionWith } from '@dlovely/core/function/generator'
import type { GenOptions } from '@dlovely/core/utils/generator'
import { isFalsy } from '@dlovely/core/utils/judge'

const _boolean = /*#__PURE__*/ (raw: boolean) => (raw ? 'true' : 'false')
const _object = /*#__PURE__*/ (raw: object) => {
  if ('toJSON' in raw && typeof raw.toJSON === 'function') raw = raw.toJSON()
  return JSON.stringify(raw)
}

/** 通过配置选项构建一个字符串生成器 */
export const genStringWith = /*#__PURE__*/ genFunctionWith({
  cache: true,
  factory<const Default = undefined>(options?: GenStringOptions<Default>) {
    const { default: de, empty = true, boolean = _boolean, object = _object } = options ?? {}
    return (raw?: unknown): string | Default => {
      if (isFalsy(raw)) return de!
      switch (typeof raw) {
        case 'string':
          if (empty || raw) return raw
          return de!
        case 'number':
        case 'bigint':
          return raw.toString()
        case 'boolean':
          return boolean(raw)
        case 'symbol':
          return raw.description ? `[Symbol: ${raw.description}]` : `[Symbol]`
        case 'object':
          return object(raw!)
        case 'function':
          return `[Function: ${raw.name || 'anonymous'}]`
        default:
          return String(raw) || de!
      }
    }
  },
})

export interface GenStringOptions<Default = undefined> extends GenOptions<Default> {
  /** 是否保留`""` */
  empty?: boolean
  /** 如何转换一个布尔值 */
  boolean?: (raw: boolean) => string
  /** 如何转换一个对象 */
  object?: (raw: object) => string
}

/** 一般字符串生成器 */
export const genString = /*#__PURE__*/ genStringWith()
/** 严格字符串生成器 */
export const genStringStrict = /*#__PURE__*/ genStringWith({ empty: false })
