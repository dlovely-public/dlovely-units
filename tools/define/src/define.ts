import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Define, DefineOptions } from './types'

/**
 * 创建静态定义
 */
export const createDefine = async (options?: DefineOptions): Promise<Define> => {
  const result = createDefineSync(options)
  const promises = [] as Promise<Define>[]
  promises.push(createDefineAboutGit(options?.cwd))
  const define_list = await Promise.all(promises)
  Object.assign(result, ...define_list)
  return result
}

const createDefineAboutGit = async (cwd = process.cwd()): Promise<Define> => {
  return {}
}

/**
 * 创建静态定义，不包含异步操作
 */
export const createDefineSync = (options?: DefineOptions): Define => {
  const result = {} as Define
  const { mode, debug, cwd } = options ?? {}
  Object.assign(result, createDefineAboutMode(mode))
  Object.assign(result, createDefineAboutDebug(debug))
  Object.assign(result, createDefineAboutPkg(cwd))
  return result
}

const createDefineAboutMode = (mode?: string): Define => {
  let __DEV__, __PROD__, __TEST__
  switch (mode) {
    case 'development':
      __DEV__ = 'true'
      __PROD__ = 'false'
      __TEST__ = 'false'
      break
    case 'test':
      __DEV__ = 'false'
      __PROD__ = 'false'
      __TEST__ = 'true'
      break
    default:
      __DEV__ = 'false'
      __PROD__ = 'true'
      __TEST__ = 'false'
      break
  }
  return { __DEV__, __PROD__, __TEST__ }
}

const createDefineAboutDebug = (debug: boolean = false): Define => ({
  __DEBUG__: `${debug}`,
})

const createDefineAboutPkg = (cwd = process.cwd()): Define => {
  const pkg_path = join(cwd, 'package.json')
  if (!existsSync(pkg_path)) return {}
  const pkg = JSON.parse(readFileSync(pkg_path, 'utf-8'))
  return { __NAME__: `"${pkg.name}"`, __VERSION__: `"${pkg.version}"` }
}
