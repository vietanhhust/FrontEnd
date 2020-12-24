import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], obj: any): any {
    return items.filter(item => {
      let result = true;
      for (let p in obj) {
        if (item[p] != obj[p]) {
          result = false;
          continue;
        }
      }
      return result;
    })
  }
}
