import { anyToString } from '@dlovely/core/utils/operator'

let __BROWSER__: boolean | null = null

export const isBrowser = /*#__PURE__*/ () =>
  (__BROWSER__ ??= anyToString(globalThis) === '[object Window]')

export const checkBrowser = /*#__PURE__*/ () => {
  if (!isBrowser()) throw new Error('仅支持浏览器环境')
}

export const checkNotBrowser = /*#__PURE__*/ () => {
  if (isBrowser()) throw new Error('不支持浏览器环境')
}
