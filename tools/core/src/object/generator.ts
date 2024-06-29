/** 以数组的元素为键，填充生成一个对象 */
export const genObjectFromArray = <Key extends PropertyKey, Value = undefined>(
  key_list?: Key[],
  value?: Value
) => {
  const result = {} as Record<Key, Value>
  if (key_list) for (const key of key_list) result[key] = value!
  return result
}
