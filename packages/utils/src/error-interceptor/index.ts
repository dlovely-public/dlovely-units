import type { ValueOf } from '@dlovely/core/object/operator'
import { createConsola } from '@dlovely/utils/consola'
import { OrderType } from '@dlovely/utils/constant'
import chalk from 'chalk'

const consola = createConsola('error-interceptor')

class ErrorInterceptor {
  constructor() {
    this.registerTarget('error', isError)
  }

  private all = new Map<string, OrderType>()
  private pre = new Map<string, ErrorInterceptorHandler>()
  private sync = new Map<string, ErrorInterceptorHandler>()
  private post = new Map<string, ErrorInterceptorHandler>()

  private target_map = new Map<string, ErrorInterceptorHandler['check']>()
  public registerTarget(target: string, check: ErrorInterceptorHandler['check']) {
    this.target_map.set(target, check)
  }

  public register<T = any>(handler: ErrorInterceptor.HandlerCustom<T>): void
  public register(handler: ErrorInterceptor.Handler): void
  public register<T = any>(handler: ErrorInterceptor.Handler | ErrorInterceptor.HandlerCustom<T>) {
    const { key, name, type = OrderType.Sync, target, checker, handler: _handler } = handler
    if (target && !this.target_map.has(target)) throw new Error('未注册的target: ' + target)
    const preCheck = target && this.target_map.get(target)
    const check: ErrorInterceptorHandler['check'] = preCheck
      ? error => preCheck(error) && (!checker || checker(error))
      : checker ?? (_ => true)

    const old_type = this.all.get(key)
    if (old_type) this[old_type].delete(key)

    this[type].set(key, {
      key,
      name: name ?? key,
      type,
      check,
      handler: _handler,
    })
    this.all.set(key, type)
  }
  public unregister(key: string) {
    const type = this.all.get(key)
    if (!type) return
    this[type].delete(key)
    this.all.delete(key)
  }

  public [Symbol.iterator]() {
    const array = [
      ...this.pre.values(),
      ...this.sync.values(),
      ...[...this.post.values()].reverse(),
    ]
    return array[Symbol.iterator]()
  }
  public async use(error: unknown) {
    if (__DEV__) consola.groupAuto('错误拦截', error)
    for (const { key, type, check, handler } of this) {
      if (!check(error)) continue
      try {
        error = await handler(error)
        if (__DEV__) consola.info(chalk.blue(key), chalk.yellow(type), error)
      } catch (error) {
        if (__DEV__) consola.info(chalk.blue(key), chalk.red(type), error)
        if (__DEV__) consola.groupEnd()
        if (error instanceof Promise) return error
        return Promise.reject(error)
      }
    }
    if (__DEV__) consola.groupEnd()
    return error
  }
}

let instance: ErrorInterceptor | null = null
export const useErrorInterceptor = () => {
  if (!instance) instance = new ErrorInterceptor()
  return instance
}

interface ErrorInterceptorHandler<T = any>
  extends Required<Omit<ErrorInterceptor.HandlerBasic<T>, 'checker'>> {
  check: (error: T) => boolean
}

export const isError = (error: unknown): error is Error => error instanceof Error

export type { ErrorInterceptor }
export namespace ErrorInterceptor {
  export type Handler = ValueOf<HandlerForExpand>
  export interface HandlerForExpand {
    HandlerError: HandlerError
  }

  export type HandlerError = {
    target: 'error'
  } & HandlerBasicWithTarget<Error>

  export interface HandlerBasicWithTarget<T> extends Omit<HandlerBasic<T>, 'checker'> {
    checker?: (error: T) => boolean
  }

  export type HandlerCustom<T> = {
    target?: undefined
  } & HandlerBasic<T>

  export interface HandlerBasic<T> {
    key: string
    name?: string
    type?: OrderType
    checker?: (error: T) => error is T
    handler(error: T): any
  }
}
