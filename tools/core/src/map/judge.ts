export const isMap = /*#__PURE__*/ (val: unknown): val is Map<any, any> => val instanceof Map

/** 判断两个Map实例是否相同，浅层对比 */
export const isMapEqual = /*#__PURE__*/ <Key, Value>(
  left: Map<Key, Value>,
  right: Map<Key, Value>
) => {
  if (!isMap(left) || !isMap(right)) return false
  if (left.size !== right.size) return false
  for (const [key, value] of left) if (!right.has(key) || right.get(key) !== value) return false
  return true
}
