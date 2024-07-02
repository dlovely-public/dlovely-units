import type { DefineOptions } from './types'

export const globalAssign = async (options?: DefineOptions): Promise<void> => {
  globalAssignSync(options)
  const promises = [] as Promise<void>[]
  const { cwd } = options ?? {}
  if (cwd) {
    promises.push(globalAssignAboutPkg(cwd))
    promises.push(globalAssignAboutGit(cwd))
  }
  await Promise.all(promises)
}

const globalAssignAboutPkg = async (cwd: string): Promise<void> => {
  const pkg_path = `${cwd}/package.json`
  const pkg = await import(pkg_path)
  Reflect.set(globalThis, '__NAME__', pkg.name)
  Reflect.set(globalThis, '__VERSION__', pkg.version)
}

const globalAssignAboutGit = async (cwd: string): Promise<void> => {}

export const globalAssignSync = (options?: DefineOptions): void => {
  const { mode, debug, cwd } = options ?? {}
  if (typeof mode !== 'undefined') globalAssignAboutMode(mode)
  if (typeof debug !== 'undefined') globalAssignAboutDebug(debug)
}

const globalAssignAboutMode = (mode: string): void => {
  switch (mode) {
    case 'development':
      Reflect.set(globalThis, '__DEV__', true)
      Reflect.set(globalThis, '__PROD__', false)
      Reflect.set(globalThis, '__TEST__', false)
      break
    case 'test':
      Reflect.set(globalThis, '__DEV__', false)
      Reflect.set(globalThis, '__PROD__', false)
      Reflect.set(globalThis, '__TEST__', true)
      break
    default:
      Reflect.set(globalThis, '__DEV__', false)
      Reflect.set(globalThis, '__PROD__', true)
      Reflect.set(globalThis, '__TEST__', false)
      break
  }
}

const globalAssignAboutDebug = (debug: boolean): void => {
  Reflect.set(globalThis, '__DEBUG__', debug)
}
