import { isArray } from '@dlovely/core/array'
import { isFalsy, type SimpleType } from '@dlovely/core/utils'
import { checkBrowser, isBrowser } from '@dlovely/utils/browser'
import type { ResponseFrom } from '@dlovely/utils/response'
import chalk from 'chalk'
import dayjs from 'dayjs'

export const Color = /*#__PURE__*/ {
  badge: /*#__PURE__*/ (color: string, message = ''): ColorMessage => {
    checkBrowser()
    return createColorMessage([
      `%c${message}`,
      `font-size: 10px;background-color: ${color}; color: white; padding: 2px 4px;border-radius: 7px;margin-right: 2px;`,
    ])
  },
  reset: /*#__PURE__*/ (): ColorMessage => {
    checkBrowser()
    return createColorMessage([`%c`, ``])
  },
  logo: /*#__PURE__*/ (logo: string, color = '#3029FC'): ColorMessage => {
    if (isBrowser()) return Color.badge(color, logo)
    return createColorMessage([chalk.hex(color)(`[${logo}]`)])
  },

  opreation: /*#__PURE__*/ (opreation: string) => chalk.greenBright(opreation),
  object: /*#__PURE__*/ (object: string) => chalk.grey.underline(object),
  description: /*#__PURE__*/ (description: string) => chalk.yellow(description),
  value: /*#__PURE__*/ (value: SimpleType) => chalk.blueBright(value),

  /** 真值展示为`✓`，假值展示为`✗` */
  check: /*#__PURE__*/ (check?: unknown) => (check ? chalk.green`✓` : chalk.red`✗`),
  /** 展示时间，默认当前时间 */
  time: /*#__PURE__*/ (date = new Date()) => Color.value(dayjs(date).format('HH:mm:ss')),
  /** 展示小箭头`->` */
  arrow: /*#__PURE__*/ () => Color.value('->'),
  /** 展示缩进，包括`>`、`-->`、`---->`等 */
  tabs: /*#__PURE__*/ (tabs: number) => Color.value('--'.repeat(tabs) + '>'),

  /** 过滤掉字符串中的`chalk`颜色代码 */
  filter: /*#__PURE__*/ <T>(message: T): ResponseFrom<T> => {
    if (isFalsy(message)) return message as ResponseFrom<T>
    return JSON.parse(JSON.stringify(message).replace(ColorFilterRE, ''))
  },
  /** 获取字符串在控制台中的长度 */
  getLength: /*#__PURE__*/ (message: string) => {
    message = Color.filter(message)
    let length = 0
    for (let i = 0; i < message.length; i++) {
      if (message.charCodeAt(i) > 255) length += 2
      else length += 1
    }
    return length
  },
}

const ColorFilterRE = /\\u001b\[[0-9]+m/g

export type ColorMessage = [string, ...any[]] & { [ColorMessageSymbol]: true }
export const ColorMessageSymbol = Symbol.for('color-message')
export const isColorMessage = /*#__PURE__*/ (raw: unknown): raw is ColorMessage => {
  if (!isArray(raw)) return false
  return !!Reflect.get(raw, ColorMessageSymbol)
}
export const createColorMessage = /*#__PURE__*/ (raw: [string, ...any[]]): ColorMessage => {
  Reflect.set(raw, ColorMessageSymbol, true)
  return raw as ColorMessage
}
