import type { UndefineToOptional } from '@dlovely/core/utils/operator'
import { Color } from '@dlovely/utils/color'
import type { ResponseAs, ResponseFrom, Token } from './types'

export /*#__PURE__*/ class Runtime<Data = void> {
  constructor(
    message: string,
    public code = 0,
    data?: Data,
    public count = 0
  ) {
    this.message = Color.filter(message)
    this.data = Color.filter(data)
  }

  public message
  public setMessage(message: string) {
    this.message = message
    return this
  }

  public setCode(code: number) {
    this.code = code
    return this
  }

  public data
  public setData(data: ResponseAs<ResponseFrom<Data>>) {
    const test = Color.filter(data)
    if (this.data && typeof this.data === 'object') Object.assign(this.data, data)
    else this.data = Color.filter(data) as ResponseFrom<Data | undefined>
    return this
  }

  public setCount(count: number) {
    this.count = count
    return this
  }

  public error: any
  public setError(error: any) {
    this.error = error
    return this
  }

  public log?: string
  public setLog(log: string) {
    this.log = log
    return this
  }

  public access_token?: Token
  public refresh_token?: Token
  public setToken(tokens: { access: Token; refresh: Token }): this
  public setToken(type: 'access' | 'refresh', token: Token): this
  public setToken(type: 'access' | 'refresh' | { access: Token; refresh: Token }, token?: Token) {
    if (typeof type === 'object') {
      this.access_token = type.access
      this.refresh_token = type.refresh
      return this
    }
    this[`${type}_token`] = token
    return this
  }

  public toJSON(): RuntimeJson<Data> {
    const { message, code, data, log, error, count, access_token, refresh_token } = this
    return { message, code, data, log, error, count, access_token, refresh_token }
  }
  public [Symbol.hasInstance](value: unknown) {
    return (
      value !== null &&
      typeof value === 'object' &&
      'code' in value &&
      'message' in value &&
      'toJSON' in value
    )
  }
}

export type RuntimeJson<Data = void> = {
  message: string
  code: number
  data?: ResponseFrom<Data>
  log?: string
  error: any
  count: number
  access_token?: Token
  refresh_token?: Token
}

export * from './types'
