import { forEach } from './array.helper';
import { clone, get, omit, pick, set } from './getter.helper';

export class WrapObject {
  clone: <T>(param: any) => T;
  get: ($data: any, $path: any, $default?: any) => any;
  omit: (data: any, keys: any[]) => any;
  pick: (data: any, keys: any[]) => any;
  set: (obj: any, keys: string | string[], val: any, safe?: boolean) => void;

  constructor(data) {
    this.clone = clone.bind(clone, data);
    this.get = get.bind(get, data);
    this.omit = omit.bind(omit, data);
    this.pick = pick.bind(pick, data);
    this.set = set.bind(set, data);
  }
}

export function urlJoin(...paths: string[]) {
  return paths.map(path => path[0] === '/' ? path.slice(1) : path)
    .join('/');
}

function getDataForUrlParam(data: any, key: string): string {
  const defVal = ':' + key;
  if (typeof data !== 'object') {
    return defVal;
  }
  let result = defVal;
  key.split('.')
    .forEach((objKey: string) => {
      if (data[objKey]) {
        result = data[objKey];
        data = data[objKey];
      } else {
        result = defVal;
      }
    });
  return result;
}

export function template(str: string, params: any): string {
  forEach(str.match(/\:([a-zA-Z_\.]+)/g), (variable: string) => {
    str = str.replace(variable, getDataForUrlParam(params, variable.replace(/([^a-zA-Z_\.]+)/g, '')));
  });
  return str;
}

/**
 * @param rawUrl http://demo.com/:id/do/some/:action
 * @param urlWithParams http://demo.com/1/do/some/thing
 */
export function getParams(rawUrl: string, urlWithParams: string): { [key: string]: string } {
  const matches = rawUrl.match(/\:([^/]+)/g);
  const rawUrlItems = rawUrl.split('/');
  const urlWithParamItems = urlWithParams.split('/');
  const params: { [key: string]: string } = {};
  if (!matches) {
    return params;
  }
  rawUrlItems.forEach((item, index) => {
    if (matches.includes(item)) {
      params[item.slice(1)] = urlWithParamItems[index];
    }
  });
  return params;
}

export function getQueryParams(url?: string) {
  return (url || window.location.href).split('?').slice(1).join('').split('&')
    .filter(value => !!value)
    .map(value => value.split('='))
    .reduce((map, [key, value]) => {
      map[key] = decodeURIComponent(value);
      return map;
    }, {});
}
export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function cssToJson(cssStr) {
  let tmp = '';
  // handling the colon in psuedo-classes
  let openBraces = 0;
  for (let i = 0; i < cssStr.length; i++) {
      let c = cssStr[i];
      if (c == '{') {openBraces++; } else if (c == '}') {openBraces--; }
      if (openBraces == 0 && c == ':') {
          tmp += '_--_';
      } else {
          tmp += c;
      }
  }
  cssStr = tmp;
  cssStr = cssStr.split('"').join('\'');
  cssStr = cssStr.split(' ').join('_SPACE_');
  cssStr = cssStr.split('\r').join('');
  cssStr = cssStr.split('\n').join('');
  cssStr = cssStr.split('\t').join('');
  cssStr = cssStr.split('}').join('"}####"');
  cssStr = cssStr.split(';"').join('"');
  cssStr = cssStr.split(':').join('":"');
  cssStr = cssStr.split('{').join('":{"');
  cssStr = cssStr.split(';').join('","');
  cssStr = cssStr.split('####').join(',');
  cssStr = cssStr.split('_--_').join(':');
  cssStr = cssStr.split('_SPACE_').join(' ');
  cssStr = cssStr.replace(/\s/g, '');
  if (cssStr.endsWith(',')) {
      cssStr = cssStr.substr(0, cssStr.length - 1);
  }
  if (cssStr.endsWith(',"')) {
      cssStr = cssStr.substr(0, cssStr.length - 2);
  }
  cssStr = '{"' + cssStr + '}';
  try {
      let jsn = JSON.parse(cssStr);
      return jsn;
  } catch (e) {
      console.log(e);
      return null;
  }
  }
  export function operatorTranslate(key) {
    switch (key) {
      case '1':
        return '[=]';
      case '2':
        return '[!=]';
      case '3':
        return '[<>]';
      case '33':
        return '[<!>]';
      case '4':
        return '[InLs]';
      case '5':
        return '[☊]';
      case '6':
        return '[Left=]';
      case '66':
        return '[Left!=]';
      case '7':
        return '[Right=]';
      case '77':
        return '[Right!=]';
      case '8':
        return '[>]';
      case '9':
        return '[>=]';
      case '10':
        return '[<]';
      case '11':
        return '[<=]';
      case '14':
        return '[empty]';
      default:
        return '[?]';
    }
  }
