import { isArray, isEmpty } from "./check.helper";


export type ArrayLoopCallback = (value: any, index: number, array: any[]) => any;

export function forEach<T>(array: T[], predicate: ArrayLoopCallback, arrayArg?: any): void {
  if (!isArray(array)) {
    return undefined;
  }
  return array.forEach(predicate, arrayArg);
}

export function map<T>(array: T[], predicate: ArrayLoopCallback, arrayArg?: any): T[] {
  if (!isArray(array)) {
    return [];
  }
  return array.map(predicate, arrayArg);
}

export function find<T>(array: T[], predicate: ArrayLoopCallback, arrayArg?: any): T {
  if (!isArray(array)) {
    return undefined;
  }
  return array.find(predicate, arrayArg);
}

export function inArray<T>(array: T[], value: T): boolean {
  if (!isArray(array)) {
    return false;
  }
  return array.indexOf(value) > -1;
}

export function last<T>(array: T[], defValue?: T): T {
  if (!isArray(array) || isEmpty(array)) {
    return defValue;
  }
  return array[array.length - 1];
}

export function some<T>(array: T[], predicate: ArrayLoopCallback, arrayArg?: any): boolean {
  if (!isArray(array)) {
    return false;
  }

  return array.some(predicate, arrayArg);
}

export function filter<T>(array: T[], predicate: ArrayLoopCallback, arrayArg?: any): T[] {
  if (!isArray(array)) {
    return [];
  }
  return array.filter(predicate, arrayArg);
}

export function findIndex<T>(array: T[], predicate: ArrayLoopCallback, arrayArg?: any): number {
  if (!isArray(array)) {
    return -1;
  }
  return array.findIndex(predicate, arrayArg);
}

export function every<T>(array: T[], predicate: ArrayLoopCallback, arrayArg?: any): boolean {
  if (!isArray(array)) {
    return true;
  }

  return array.every(predicate, arrayArg);
}

export function flatten<T>(array: T[]): T[] {
  if (!isArray(array)) {
    return [];
  }

  return array.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []);
}

export function random<T>(array: T[]): T {
  if (!isArray(array)) {
    return undefined;
  }

  return array[Math.floor(Math.random() * array.length)];
}
export function insertAt(array, index, obj) {
  return array.splice(index, 0, obj);
}

export function parseCss(obj) {
  try {
    JSON.parse(obj);
  } catch (e) {
    return false;
  }
  return JSON.parse(obj);
}

export function groupBy(xs, f) {
  return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
}
