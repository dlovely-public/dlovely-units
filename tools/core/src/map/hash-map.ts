import { anyToString } from '@dlovely/core/utils/operator'

export class HashMap<Value extends object> {
  private bucket
  public readonly hash: HashMap.Hash<Value>
  constructor(hash: keyof Value | HashMap.Hash<Value>, entries?: Iterable<Value>) {
    if (typeof hash === 'function') this.hash = hash
    else
      this.hash = value => {
        const key = value[hash]
        switch (key) {
          case 'string':
          case 'number':
          case 'symbol':
            return key as PropertyKey
          default:
            throw new TypeError(
              `导入数据${anyToString(value)}时生成的Key不是string、number或symbol`
            )
        }
      }
    this.bucket = new Map(entries && Array.from(entries, value => [this.hash(value), value]))
  }

  public get(key: PropertyKey) {
    return this.bucket.get(key)
  }

  public add(value: Value) {
    const key = this.hash(value)
    if (this.bucket.has(key)) throw new TypeError('已存在相同的Key')
    this.bucket.set(key, value)
  }

  public set(value: Value) {
    const key = this.hash(value)
    if (!this.bucket.has(key)) throw new TypeError('不存在相同的Key')
    this.bucket.set(key, value)
  }

  public put(value: Value) {
    const key = this.hash(value)
    this.bucket.set(key, value)
  }

  public delete(value: Value) {
    const key = this.hash(value)
    this.bucket.delete(key)
  }

  public clear() {
    this.bucket.clear()
  }

  public has(value: Value) {
    const key = this.hash(value)
    return this.bucket.has(key)
  }

  public get size() {
    return this.bucket.size
  }

  public entries() {
    return this.bucket.entries()
  }

  public keys() {
    return this.bucket.keys()
  }

  public values() {
    return this.bucket.values()
  }

  public [Symbol.iterator]() {
    return this.values()
  }

  public forEach(callbackfn: (value: Value, hash_map: this) => void) {
    this.bucket.forEach(value => {
      callbackfn(value, this)
    })
  }

  public [Symbol.toStringTag] = 'HashMap'
}
export namespace HashMap {
  export type Hash<Value extends object> = (value: Value) => PropertyKey
}
