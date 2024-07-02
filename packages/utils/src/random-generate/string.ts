import { genArray } from '@dlovely/core/array/generator'
import { type MaybeArray } from '@dlovely/core/array/judge'
import { genNaturalNumber } from '@dlovely/core/number/generator'
import { randomIntger } from './number'

export const randomString = /*#__PURE__*/ ((length, options) => {
  if (typeof length === 'object') {
    options = length
    // @ts-ignore
    length = options.length
  }
  length = genNaturalNumber(length) || 16

  const key_list = genArray(options?.type)
  if (!key_list.length) key_list.push('number', 'lower', 'upper')
  let source = ''
  for (const key of key_list) if (key in randomString.source) source += randomString.source[key]
  source = [...new Set(source)].join('')
  const source_length = source.length

  let result = ''
  for (; length > 0; length--) result += source[randomIntger(0, source_length)]
  return result
}) as RandomString
// @ts-expect-error 初始化
randomString.source = {
  number: '0123456789',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  hex: '0123456789abcdef',
  binary: '01',
  octal: '01234567',
}
export interface RandomString {
  (options?: RandomString.Options): string
  (length?: number, options?: Omit<RandomString.Options, 'length'>): string
  readonly source: Readonly<Record<RandomString.Type, string>>
}
export namespace RandomString {
  export type Type = 'number' | 'lower' | 'upper' | 'hex' | 'binary' | 'octal'
  export interface Options {
    length?: number
    type?: MaybeArray<Type>
  }
}
