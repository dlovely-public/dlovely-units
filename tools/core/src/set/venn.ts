export class Venn<Left, Right> {
  constructor(left: Iterable<Left>, right: Iterable<Right>) {
    const only_left = new Set(left)
    const only_right = new Set(right)
    const both = new Set<Extract<Left, Right>>()
    for (const item of only_left)
      if (only_right.has(item)) {
        both.add(item)
        only_left.delete(item)
        only_right.delete(item)
      }
    this._left = only_left
    this._right = only_right
    this._both = both
  }

  private _left
  public get left() {
    return this._left as ReadonlySet<Left>
  }
  private _right
  public get right() {
    return this._right as ReadonlySet<Right>
  }
  private _both
  public get both() {
    return this._both as ReadonlySet<Extract<Left, Right>>
  }

  public addLeft(item: Left) {
    if (this._both.has(item)) return false
    if (this._left.has(item)) return false
    if (!this._right.has(item)) this._left.add(item)
    else {
      this._right.delete(item)
      this._both.add(item)
    }
    return true
  }

  public delLeft(item: Left) {
    if (this._both.has(item)) {
      this._both.delete(item)
      this._right.add(item)
      return true
    }
    if (this._left.has(item)) {
      this._left.delete(item)
      return true
    }
    return false
  }

  public addRight(item: Right) {
    if (this._both.has(item)) return false
    if (this._right.has(item)) return false
    if (!this._left.has(item)) this._right.add(item)
    else {
      this._left.delete(item)
      this._both.add(item as Extract<Left, Right>)
    }
    return true
  }

  public delRight(item: Right) {
    if (this._both.has(item)) {
      this._both.delete(item)
      this._left.add(item)
      return true
    }
    if (this._right.has(item)) {
      this._right.delete(item)
      return true
    }
    return false
  }
}

declare global {
  interface Set<T> {
    /**
     * @returns a boolean indicating whether an element with the specified value exists in the Set or not.
     */
    has(value: T): boolean
    /**
     * @returns a boolean indicating whether an element with the specified value exists in the Set or not.
     */
    has<U>(value: U): value is Extract<U, T>
  }
  interface ReadonlySet<T> {
    has(value: T): boolean
    has<U>(value: U): value is Extract<U, T>
  }
}
