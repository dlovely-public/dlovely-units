import { isArray, type MaybeArray } from '@dlovely/core/array/judge'
import { isTruthy } from '@dlovely/core/utils/judge'
import { UpperEnum, UpperMoreEnum } from './constant'
import type { MaybeNumber } from './judge'

/** 对传入的所有数字进行累加 */
export const sum = /*#__PURE__*/ (...nums: number[]) => nums.reduce((a, b) => a + b, 0)
/** 对可能的数字数组进行求和，如果仅传入单数字则自动返回 */
export const autoSum = /*#__PURE__*/ (nums: MaybeArray<number>) =>
  isArray(nums) ? sum(...nums) : nums

/** 对传入数字进行可选的限制，并传出最近的符合限制的值 */
export const limit = /*#__PURE__*/ (num: number, min?: number, max?: number) => {
  if (isTruthy(min) && num < min) return min
  if (isTruthy(max) && num > max) return max
  return num
}

/** 对单个数字返回其对应汉字 */
export const toUpperSingle = /*#__PURE__*/ (num: MaybeNumber) =>
  UpperEnum[typeof num === 'number' ? num : parseInt(num, 10)]

const DigitEnum = [, '十', '百', '千', '万', '亿']
const _toUpper = /*#__PURE__*/ (num: string) => {
  const nums = num.split('')
  let index = 0
  let result = ''
  while (nums.length) {
    const num = nums.pop()!
    result = (index ? DigitEnum[index] : '') + toUpperSingle(num) + result
    index++
  }
  return result
}
/** 对一串数字返回其对应汉字 */
export const toUpper = /*#__PURE__*/ (num: number) => {
  if (num > 2 ** 32 - 1) throw new SyntaxError('数字太大')
  const [int, dec] = String(num).split('.')
  let result = ''
  if (int.length > 8) result += _toUpper(int.slice(0, -8)) + '亿'
  if (int.length > 4) result += _toUpper(int.slice(-8, -4)) + '万'
  result += _toUpper(int.slice(-4))
  if (dec) result += '点' + dec.split('').map(toUpperSingle).join('')
  return result
}

/** 对单个数字返回其对应大写汉字 */
export const toUpperMoreSingle = /*#__PURE__*/ (num: MaybeNumber) =>
  UpperMoreEnum[typeof num === 'number' ? num : parseInt(num)]
/** 对一串数字返回其对应大写汉字 */
export const toUpperMore = /*#__PURE__*/ (num: number) =>
  num.toString().split('').map(toUpperMoreSingle).join('')

/** 对单个数字返回其对应字母 */
export const toLetterSingle = /*#__PURE__*/ (num: number) => String.fromCharCode(num + 65)
