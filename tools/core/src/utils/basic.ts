/** 简单类型 */
export type SimpleType = string | number | boolean
/** 严格假值 */
export type FalsyStrictType = void | undefined | null
/** 假值 */
export type FalsyType = FalsyStrictType | 0 | '' | false
/** 基本类型 */
export type BaseType = SimpleType | PropertyKey | FalsyStrictType | bigint
/** 特殊类型 */
export type SpecialType = Function | Date | Error | RegExp | Blob | File | FormData
/** 内建类型 */
export type BuiltInType = BaseType | SpecialType

/** 可迭代集合类型 */
export type IterableCollections = Map<any, any> | Set<any>
/** 弱引用集合类型 */
export type WeakCollections = WeakMap<any, any> | WeakSet<any>
/** Map类型 */
export type MapTypes = Map<any, any> | WeakMap<any, any>
/** Set类型 */
export type SetTypes = Set<any> | WeakSet<any>
/** 集合类型 */
export type CollectionTypes = IterableCollections | WeakCollections
