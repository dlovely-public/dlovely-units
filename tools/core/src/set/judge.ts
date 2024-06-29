export const isSet = /*#__PURE__*/ (val: unknown): val is Set<any> => val instanceof Set

/** 判断两个Set实例是否相同，浅层对比 */
export const isSetEqual = /*#__PURE__*/ <Value>(left: Set<Value>, right: Set<Value>) => {
  if (!isSet(left) || !isSet(right)) return false
  if (left.size !== right.size) return false
  for (const value of left) if (!right.has(value)) return false
  return true
}

/** 判断一个Set实例中是否包含后者的所有元素 */
export const isSetContain = /*#__PURE__*/ <Value>(set: Set<Value>, list: Iterable<Value>) => {
  for (const item of list) if (!set.has(item)) return false
  return true
}
