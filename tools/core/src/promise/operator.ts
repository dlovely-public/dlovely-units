/** 处理一个promise，使其成功后返回真值，失败后返回假值，不再抛出错误 */
export const boolPromise = /*#__PURE__*/ <const Truthy = true, const Falsy = false>(
  promise: Promise<unknown>,
  options?: {
    truthy?: Truthy
    falsy?: Falsy
  }
) => {
  const { truthy = true as Truthy, falsy = false as Falsy } = options ?? {}
  return promise.then(
    () => truthy,
    () => falsy
  )
}

/** 处理一个promise，使其抛出错误时转而返回一个指定值 */
export const catchPromise = /*#__PURE__*/ <Result, const Default = undefined>(
  promise: Promise<Result>,
  de?: Default
) => promise.catch(() => de as Default)
