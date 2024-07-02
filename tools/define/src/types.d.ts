/** 静态定义创建选项 */
export interface DefineOptions {
  /**
   * 运行模式
   *
   * @example 'development' - 开发模式
   * @example 'test' - 测试模式
   * @example 'production' - 生产模式
   */
  mode?: string
  /** 是否启用调试 */
  debug?: boolean
  /**
   * 项目路径
   *
   * @default process.cwd()
   */
  cwd?: string
}

/** 静态定义 */
export type Define = Record<string, string>

declare global {
  const __DEV__: boolean
  const __PROD__: boolean
  const __TEST__: boolean

  const __DEBUG__: boolean

  const __NAME__: string
  const __VERSION__: string
}
