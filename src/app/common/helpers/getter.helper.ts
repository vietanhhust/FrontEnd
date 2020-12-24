import { isArray, isFunction, isObject, isString, isUndefined } from './check.helper';
import { forEach, inArray } from './array.helper';

/**
 * Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned in its place.
 *
 * @example <caption>basic</caption>
 * // return 012345
 * get({info: {phone: '012345'}}, 'info.phone')
 *
 * @example <caption>default value</caption>
 * // return 'Andrew Foy'
 * get({info: {phone: '012345'}}, 'info.fullname', 'Andrew Foy')
 */
export function get($data: any, $path: string | string[], $default?: any): any {
  if (!isObject($data)) {
    return $default;
  }
  if (!isString($path) && !isArray($path)) {
    return $data;
  }
  if (isString($path) && !isUndefined($data[$path])) {
    return $data[$path];
  }
  const $paths = getPath($path);
  for (const $segment of $paths) {
    if ((isObject($data) || isFunction($data)) && !isUndefined($data[$segment])) {
      $data = $data[$segment];
    } else {
      return $default;
    }
  }
  return $data;
}

/**
 * Creates an object composed of the picked object properties.
 * @example
 * const object = {a: 1, b: '2', c: 3};
 * @example <caption>basic</caption>
 * // return {a: 1, c: 3}
 * pick(object, ['a', 'c', 'd'])
 * @example <caption>default value</caption>
 * // return {a: 1, c: 3, d: 10}
 * pick(object, ['a', 'c', {d: 10}])
 * @example <caption>rename property result</caption>
 * // return {a: 1, e: 1}
 * pick(object, ['a', {d: {e: 1}}])
 * // return {a: 1, f: '2'}
 * pick(object, ['a', {b: {f: 1}}])
 */
export function pick(data: any, keys: any[]): any {
  const result: any = {};
  if (!isObject(data)) {
    return result;
  }
  let tmp;

  forEach(keys, key => {
    // normal case when key is string
    if (isString(key)) {
      tmp = get(data, key);
      set(result, key, tmp, true);
      return;
    }
    // other case when key is object
    if (isObject(key)) {
      const objKey = Object.keys(key)[0];
      // when value base on key is function
      if (pickAndRenameByCallbackFunction(result, data, key, objKey)) {
        return;
      }
      // when value base on key is object
      if (pickWithRenameProperty(result, data, key, objKey)) {
        return;
      }
      tmp = get(data, objKey, key[objKey]);
      set(result, objKey, tmp, true);
    }
  });
  return result;
}

/**
 * @example
 * ```javascript
 * const object = {a: 1, b: '2', c: 3};
 * const result = pick(object, [
 *  'a',
 *  {
 *    b (key) { // key has value is b
 *      return 'x';
 *    }
 *  }
 * ]); /// { a: 1, x: '2' }
 * ```
 */
function pickAndRenameByCallbackFunction(result: any, data: any, key: object, objKey: string): boolean {
  if (isFunction(key[objKey])) {
    set(result, key[objKey](objKey), get(data, objKey), true);
    return true;
  }
  return false;
}

/**
 * @example
 * ```javascript
 * const object = {a: 1, b: '2', c: 3};
 * const result = pick(object, [ 'a', {c: {k: 1}} ]); /// { a: 1, k: 3 }
 * ```
 */
function pickWithRenameProperty(result: any, data: any, key: object, objKey: string): boolean {
  if (isObject(key[objKey])) {
    const deepKeys = Object.keys(key[objKey]);
    if (deepKeys.length) {
      set(result, deepKeys[0], get(data, objKey, key[objKey][deepKeys[0]]), true);
      return true;
    }
  }
  return false;
}

/**
 * Input an array this function return properties of the object which is not included in the array.
 *
 * @example <caption>basic</caption>
 * const object = {a: 1, b: '2', c: 3};
 * // return { 'b': '2' }
 * omit(object, ['a', 'c']);
 */
export function omit(data: any, keys: any[]): any {
  const result: any = {};
  if (!isObject(data)) {
    return result;
  }
  if (!isArray(keys) || !keys.length) {
    return result;
  }
  for (const property in data) {
    if (data.hasOwnProperty(property) && !inArray(keys, property)) {
      result[property] = data[property];
    }
  }
  return result;
}

/**
 * Clone deep object and clear reference
 */
export function clone<T>(param: any): T {
  return JSON.parse(JSON.stringify(param));
}

/**
 * Set value for object by dot key
 * @example
 *   *  let foo = { a:1, b:2 };
 *  let bar = { foo:123, bar:[4, 5, 6], baz:{} };
 *  let baz = { a:1, b:{ x:{ y:{ z:999 } } }, c:3 };
 *
 *  set(foo, 'd.e.f', 'hello');
 *  // or ~> set(foo, ['d', 'e', 'f'], 'hello');
 *  console.log(foo);
 *  //=> { a:1, b:2, d:{ e:{ f:'hello' } } };
 *
 *  set(bar, 'bar.1', 999);
 *  // or ~> set(bar, ['bar', 1], 999);
 *  console.log(bar);
 *  //=> { foo:123, bar:[4, 999, 6], baz:{} };
 *
 *  set(baz, 'b.x.j.k', 'mundo');
 *  set(baz, 'b.x.y.z', 'hola');
 *  console.log(baz);
 *  //=> { a:1, b:{ x:{ y:{ z:'hola' }, j:{ k:'mundo' } } }, c:3 }
 */
export function set(obj: object, keys: string | string[], val: any, safe?: boolean): void {
  if (safe && isUndefined(val)) {
    return;
  }
  if (isString(keys)) {
    keys = keys.split('.');
  }
  let index = 0;
  const length = keys.length;
  let temp = obj;
  let x;
  for (; index < length; ++index) {
    x = temp[keys[index]];
    temp = temp[keys[index]] = (index === length - 1 ? val : (x == null ? {} : x));
  }
}

/**
 * Get array string path from string dot path
 * @example
 * // return ['path', 'to', 'dest']
 * getPath('path.to.dest')
 */
export function getPath($path: string | string[]): string[] {
  if (isArray($path)) {
    return $path;
  }
  if (!$path || !isString($path)) {
    return [];
  }
  // noinspection SingleCharAlternation
  return $path.replace(/(\[|\])/g, '.')
    .replace(/\.+/g, '.')
    .split('.')
    .filter(path => !!path);
}
