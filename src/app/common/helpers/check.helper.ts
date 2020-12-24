export function isObject(data: any, lenient?: boolean): data is object {
  return (lenient ? true : data !== null) && typeof data === 'object';
}

export function isString(data: any): data is string {
  return data instanceof String ||  typeof data === 'string';
}

export function isUndefined(data: any): data is undefined {
  return typeof data === 'undefined';
}

export function isFunction(data: any): data is Function {
  return data instanceof Function;
}

export function isArray(data: any): data is Array<any> {
  if (Array.isArray) {
    return Array.isArray(data);
  }
  return Object.prototype.toString.call(data) === '[object Array]';
}

export function isEmpty(value: any): boolean {
  if (!value) {
    return true;
  }
  if (isArray(value)) {
    return !value.length;
  }

  return isObject(value) && !Object.keys(value).length;
}
