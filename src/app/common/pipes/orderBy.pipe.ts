import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { CharHelper } from '../helpers/char.helper';
import { formatThousandNumber } from '../helpers/number';

@Pipe({
    name: 'orderBy', pure: false
  })

  export class OrderBy implements PipeTransform {
    transform(array: Array<any>, args?: any, order?: boolean): any {
        if (order == true) {
            if (args == undefined) {
                return _.sortBy(array, [args]).reverse();
            }
            if (array != null) {
                return  array.sort((left, right) => {
                    if (left[args] === '-') {
                        return right[args] === '-' ? 0 : 1;
                    }
                    if (typeof right[args] === 'number') {
                        return right[args] - left[args];
                    } else {
                        return right[args] === '-' ? -1 : left[args].localeCompare(right[args]);
                    }
                }).reverse();
            }
        } else {
            if (args == undefined) {
                return _.sortBy(array, [args]);
            }
           if (array != null) {
            return  array.sort((left, right) => {
                if (left[args] === '-') {
                    return right[args] === '-' ? 0 : 1;
                }
                if (typeof right[args] === 'number') {
                    return  right[args] - left[args];
                } else {
                    return right[args] === '-' ? -1 : left[args].localeCompare(right[args]);
                }
            });
        }
        }
    }
}
@Pipe({
    name: 'sortwithName'
  })
  export class SortPipe implements PipeTransform {
    transform(array: any[], field: string): any[] {
     if (Array.isArray(array)) {
        array.sort((a: any, b: any) => {
            if (a[field] && a[field] < b[field]) {
              return -1;
            } else if (a[field] && a[field] > b[field]) {
              return 1;
            } else {
              return 0;
            }
          });
     }
     return array;
    }
  }

  @Pipe({
    name: 'sortwithKeyObject'
  })
  export class SortObjectPipe implements PipeTransform {
    transform(array: any[], field: string): any[] {
     if (Array.isArray(array)) {
        array.sort((a: any, b: any) => {
            if (a.value && a.value[field] < b.value[field]) {
              return -1;
            } else if (a.value && a.value[field] > b.value[field]) {
              return 1;
            } else {
              return 0;
            }
          });
     }
     return array;
    }
  }
@Pipe({
    name: 'SearchReport',
  })
  export class SearchReport implements PipeTransform {
    constructor(private char: CharHelper) {}
    transform(arr: any, args?: any, subarg?: any): any {
        if (!arr) {return null; }
        if (!args) {return arr; }
        args = args.toLowerCase();
        let sub = [];
        if (!subarg) {
            return arr.filter((item) => {
                return this.char.MakePipeChar(JSON.stringify(item).toLowerCase()).includes(this.char.MakePipeChar(args));
            });
        } else {
            sub.push(
                ...arr.filter(item => this.char.MakePipeChar(JSON.stringify(item).toLowerCase()).includes(this.char.MakePipeChar(args))
                ));
                arr.filter((item) => {
                    item[subarg].filter((obj) => {
                        if (this.char.MakePipeChar(JSON.stringify(obj).toLowerCase()).includes(this.char.MakePipeChar(args))) {
                            sub.push(item);
                        }
                     });
                });
                sub = sub.filter((v, i, a) =>
                a.findIndex(t => (t.inventoryId === v.inventoryId)) === i);
                return sub;
        }
    }
  }

  @Pipe({
    name: 'SearchPipe',
  })
  export class SearchPipe implements PipeTransform {
    constructor(private char: CharHelper) {}
    transform(value: any, args?: any): any {
        if (!value) {return null; }
        if (!args) {return value; }

        args = args.toLowerCase();

        return value.filter((item) => {
            return this.char.MakePipeChar(JSON.stringify(item).toLowerCase()).includes(this.char.MakePipeChar(args));
        });
    }
}

@Pipe({
  name: 'SearchPipeAsync',
  pure: false

})
export class SearchPipeAsync implements PipeTransform {
  private cachedData: any = null;
  private cachedKeywords = '';
  private timeoutId:any;
  private _subject = new BehaviorSubject(null);

  constructor(private char: CharHelper) {}
  transform(value: any, args?: any): any {
      if (!value) { 
        this._subject.next(null); 
        return this._subject;
      }
      if (!args) {
        this._subject.next(value); 
        return this._subject;
      }

     let kw= this.char.MakePipeChar(args.toLowerCase());
      if (kw !== this.cachedKeywords) {
        this.cachedData = null;
        this.cachedKeywords = kw;
        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(()=>{
          this.cachedData = value.filter((item) => {
              if(!item.searchCached){
                item.searchCached = this.char.MakePipeChar(JSON.stringify(item).toLowerCase())
              }
              return item.searchCached.includes(kw);
          });
          this._subject.next(this.cachedData)
        }, 300)
        
      }
      return this._subject;
  }
}

// for bill
@Pipe({
  name: 'SearchRowPipe',
})
export class SearchRowPipe implements PipeTransform {
  constructor(private char: CharHelper) { }
  transform(arr: any, args?: any): any {
    if (!arr) { return null; }
    if (!args) { return arr; }
    if (args == '') { return arr; }
    args = args.toLowerCase();

    return arr.filter((item) => {
      let result = false;
      // tslint:disable-next-line: forin
      for (const p in item) {
        if (this.char.MakePipeChar(item[p].value).toLowerCase().includes(this.char.MakePipeChar(args)) || this.char.MakePipeChar(item[p].titleValue).toLowerCase().includes(this.char.MakePipeChar(args))) {
          result = true;
          continue;
        }
      }
      return result;
    });
  }
}

@Pipe({
  name: 'sortRow'
})
export class SortRowPipe implements PipeTransform {
  transform(array: any, field: string, asc: any, refresh: number): any[] {
    if (!array) { return null; }
    if (!field) { return array; }
    if (field == '') { return array; }
   if (Array.isArray(array)) {
    return _.orderBy(array, o => {
      if (!isNaN(o[field].value) && !isNaN(parseFloat(o[field].value))) {
        o[field].value = parseFloat(o[field].value);
      }
      return o[field].value;
    }, [asc]);
   }
   return array;
  }
}
