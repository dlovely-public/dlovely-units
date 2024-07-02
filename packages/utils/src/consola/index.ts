import { isBrowser } from '@dlovely/utils/browser'
import { Color, createColorMessage, type ColorMessage } from '@dlovely/utils/color'
import chalk from 'chalk'
import { Cache } from './cache'

export const createConsola = (...params: Parameters<typeof Color.logo>) => {
  let NoLogoCount = 0

  const _logo = Color.logo(...params)
  const _empty = createColorMessage([''])
  const getLogo = (): ColorMessage => (NoLogoCount > 0 ? _empty : _logo)
  const getStatus = (status: string): ColorMessage =>
    NoLogoCount > 0 ? _empty : createStatus(status, cache !== null)

  const cache = isBrowser() ? new Cache() : null

  const debug = (...data: any[]) => {
    if (!__DEBUG__) return
    if (!cache) {
      const [message, ...rest] = data
      let first = getLogo()[0] + getStatus('debug')[0]
      if (typeof message !== 'object') first += message
      console.debug('  '.repeat(NoLogoCount), first, ...rest)
      return
    }
    cache.push(getLogo())
    cache.push(getStatus('debug'))
    cache.push(Color.reset())
    data.forEach(cache.push, cache)
    cache.exec('debug')
  }

  const info = (...data: any[]) => {
    if (!cache) {
      const [message, ...rest] = data
      let first = getLogo()[0] + getStatus('debug')[0]
      if (typeof message !== 'object') first += message
      console.debug('  '.repeat(NoLogoCount), first, ...rest)
      return
    }
    cache.push(getLogo())
    cache.push(getStatus('debug'))
    cache.push(Color.reset())
    data.forEach(cache.push, cache)
    cache.exec('debug')
  }

  const log = (...data: any[]) => {
    if (!cache) {
      const [message, ...rest] = data
      let first = getLogo()[0] + getStatus('info')[0]
      if (typeof message !== 'object') first += message
      console.log('  '.repeat(NoLogoCount), first, ...rest)
      return
    }
    cache.push(getLogo())
    cache.push(getStatus('info'))
    cache.push(Color.reset())
    data.forEach(cache.push, cache)
    cache.exec('log')
  }

  const warn = (...data: any[]) => {
    if (!cache) {
      const [message, ...rest] = data
      let first = getLogo()[0] + getStatus('warn')[0]
      if (typeof message !== 'object') first += message
      console.log('  '.repeat(NoLogoCount), first, ...rest)
      return
    }
    cache.push(getLogo())
    cache.push(getStatus('warn'))
    cache.push(Color.reset())
    data.forEach(cache.push, cache)
    cache.exec('log')
  }

  const error = (...data: any[]) => {
    if (!cache) {
      const [message, ...rest] = data
      let first = getLogo()[0] + getStatus('error')[0]
      if (typeof message !== 'object') first += message
      console.log('  '.repeat(NoLogoCount), first, ...rest)
      return
    }
    cache.push(getLogo())
    cache.push(getStatus('error'))
    cache.push(Color.reset())
    data.forEach(cache.push, cache)
    cache.exec('log')
  }

  const group = (...data: any[]) => {
    NoLogoCount += 1
    if (!cache) {
      const [message, ...rest] = data
      let first = getLogo()[0]
      if (typeof message !== 'object') first += message
      console.log('  '.repeat(NoLogoCount - 1), first, ...rest)
      return
    }
    cache.push(getLogo())
    cache.push(Color.reset())
    data.forEach(cache.push, cache)
    cache.exec('group')
  }

  const groupCollapsed = (...data: any[]) => {
    if (!cache) throw new Error('仅支持浏览器环境')
    NoLogoCount += 1
    cache.push(getLogo())
    cache.push(Color.reset())
    data.forEach(cache.push, cache)
    cache.exec('groupCollapsed')
  }

  const groupAuto = (...data: any[]) => {
    if (!cache) return group(...data)
    if (__DEBUG__) group(...data)
    else groupCollapsed(...data)
  }

  const groupEnd = () => {
    if (NoLogoCount > 0) NoLogoCount -= 1
    if (!cache) return
    console.groupEnd()
  }

  return { debug, info, log, warn, error, group, groupCollapsed, groupAuto, groupEnd }
}

const createStatus = (status: string, isBrowser: boolean): ColorMessage => {
  let result
  switch (status) {
    case 'info':
      result = isBrowser ? Color.badge('green', status) : [chalk.greenBright(`[${status}]`)]
      break
    case 'warn':
      result = isBrowser ? Color.badge('yellow', status) : [chalk.yellowBright(`[${status}]`)]
      break
    case 'error':
      result = isBrowser ? Color.badge('red', status) : [chalk.redBright(`[${status}]`)]
      break
    default:
      result = isBrowser ? Color.badge('grey', status) : [chalk.grey(`[${status}]`)]
      break
  }
  return createColorMessage(result as any)
}
