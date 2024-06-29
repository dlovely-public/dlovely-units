import type { IsEqual } from '@dlovely/core/utils/judge'
import type { IsString } from './judge'

/** 将字符串的首字母大写 */
export const capitalize = /*#__PURE__*/ <Raw extends string>(raw: Raw) => {
  if (raw.length === 0) return raw as Capitalize<Raw>
  return (raw[0].toUpperCase() + raw.slice(1)) as Capitalize<Raw>
}
/** 将字符串的首字母小写 */
export const uncapitalize = /*#__PURE__*/ <Raw extends string>(raw: Raw) => {
  if (raw.length === 0) return raw as Uncapitalize<Raw>
  return (raw[0].toLowerCase() + raw.slice(1)) as Uncapitalize<Raw>
}

export type StartsWith<Raw extends string, P extends string> = Raw extends `${P}${infer _}`
  ? true
  : false
export type EndsWith<Raw extends string, P extends string> = Raw extends `${infer _}${P}`
  ? true
  : false
declare global {
  interface String {
    startsWith<Raw extends string, P extends string>(
      this: Raw,
      prefix: P
    ): this is Raw & `${P}${string}`
    endsWith<Raw extends string, P extends string>(
      this: Raw,
      suffix: P
    ): this is Raw & `${string}${P}`
  }
}

type _Split<
  Raw extends string,
  S extends string,
  Result extends string[] = [],
> = Raw extends `${infer Head}${S}${infer Tail}`
  ? _Split<Tail, S, [...Result, Head]>
  : IsEqual<Raw, ''> extends true
    ? Result
    : IsString<Raw> extends true
      ? string[]
      : [...Result, Raw]
export type Split<Raw extends string, S extends string = ''> = _Split<Raw, S>
declare global {
  interface String {
    split<Raw extends string, P extends string>(this: Raw, separator: P): Split<Raw, P>
  }
}

type _Join<Raw extends string[], S extends string, Result extends string = ''> = Raw extends [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? IsString<Head> extends true
    ? string
    : _Join<Tail, S, IsEqual<Result, ''> extends true ? Head : `${Result}${S}${Head}`>
  : Result
export type Join<Raw extends string[], S extends string = ','> = _Join<Raw, S>
export const joinToString = /*#__PURE__*/ <const Raw extends string[], S extends string = ','>(
  raw: Raw,
  separator?: S
) => raw.join(separator) as Join<Raw, S>
