export const EMPTY_OBJ: { readonly [key: string]: any } = /*#__PURE__*/ __DEV__
  ? Object.freeze({})
  : {}
export const EMPTY_ARR: readonly any[] = /*#__PURE__*/ __DEV__ ? Object.freeze([]) : []

export /*#__PURE__*/ enum OrderType {
  Pre = 'pre',
  Sync = 'sync',
  Post = 'post',
}
