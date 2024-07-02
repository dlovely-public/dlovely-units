import { genNumberWith } from '@dlovely/core/number/generator'

export const randomIntger = /*#__PURE__*/ (min: number, max: number) => {
  const genNumber = genNumberWith({ default: 0, interger: -1 })
  min = genNumber(min)
  max = genNumber(max)
  if (min >= max) throw new Error('范围错误')
  if (max - min > 0x7fffffff) throw new Error('范围过大')
  if (max - min === 1) return min
  return min + Math.floor(Math.random() * (max - min))
}
