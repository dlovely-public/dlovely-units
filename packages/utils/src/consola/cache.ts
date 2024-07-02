import { isTruthy } from '@dlovely/core/utils'
import { checkBrowser } from '@dlovely/utils/browser'
import { isColorMessage } from '@dlovely/utils/color'

export class Cache {
  static instance: Cache | null = null
  constructor() {
    if (Cache.instance) return Cache.instance
    checkBrowser()
    Cache.instance = this
  }

  private message = ''
  private data: any[] = []
  private can_join = true

  public append(message: string, ...data: any[]) {
    data.length = message.match(Cache.CssPlaceholderRE)?.length ?? 0
    this.message += message
    this.data.push(...data)
  }

  public push(item: unknown) {
    if (isColorMessage(item)) return this.append(item[0], ...item.slice(1))
    if (!this.can_join) {
      this.data.push(item)
      return
    }
    if (item && typeof item === 'object') {
      this.can_join = false
      this.data.push(item)
    } else if (isTruthy(item)) this.message += ` ${item}`
  }

  public exec(type: 'log' | 'debug' | 'group' | 'groupCollapsed') {
    console[type](this.message, ...this.data)
    this.message = ''
    this.data.length = 0
    this.can_join = true
  }

  static CssPlaceholderRE = /%c/g
}
