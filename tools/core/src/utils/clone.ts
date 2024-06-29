import type { BaseType } from './basic'
import { DIRECT } from './generator'
import { anyToString } from './operator'

export const isClonosable = /*#__PURE__*/ <T extends object>(raw: T): raw is T & Clonosable =>
  Reflect.has(raw, Symbol.clone)

export const clone = /*#__PURE__*/ <T extends BaseType | Clonosable>(raw: T): T => {
  if (typeof raw !== 'object' || !raw) return raw
  if (!isClonosable(raw))
    throw SyntaxError(`存在对象${anyToString(raw)}未支持[Symbol.clone]操作`, {
      cause: raw,
    })
  return raw[Symbol.clone]()
}

export const cloneDeep = /*#__PURE__*/ <T extends BaseType | Clonosable>(raw: T): T => {
  if (typeof raw !== 'object' || !raw) return raw
  if (!isClonosable(raw))
    throw SyntaxError(`存在对象${anyToString(raw)}未支持[Symbol.clone]操作`, {
      cause: raw,
    })
  return raw[Symbol.clone](cloneDeep as any)
}

Reflect.set(Symbol, 'clone', Symbol.for('Symbol.clone'))

Array.prototype[Symbol.clone] = function (this: any, transform = DIRECT) {
  const result = [] as unknown as typeof this
  for (const [index, value] of this.entries()) result[index] = transform(value)
  return result
}

Set.prototype[Symbol.clone] = function (this: any, transform = DIRECT) {
  const result = new Set() as typeof this
  for (const value of this.values()) result.add(transform(value))
  return result
}

Map.prototype[Symbol.clone] = function (this: any, transform = DIRECT) {
  const result = new Map() as unknown as typeof this
  for (const [key, value] of this.entries()) result.set(transform(key), transform(value))
  return result
}

declare global {
  interface SymbolConstructor {
    readonly clone: unique symbol
  }
  interface Clonosable {
    [Symbol.clone]<T>(this: T, transform?: typeof DIRECT<T>): T
  }
  interface Array<T> extends Clonosable {}
  interface Set<T> extends Clonosable {}
  interface Map<K, V> extends Clonosable {}
}
