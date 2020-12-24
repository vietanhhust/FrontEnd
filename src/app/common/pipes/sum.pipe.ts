import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sum'
  })
  export class SumPipe implements PipeTransform {
    transform(items: any[], attr: string): any {
      if (items !== undefined){
        return items.reduce((a, b) => a + b[attr], 0);
      }
  }
  }
