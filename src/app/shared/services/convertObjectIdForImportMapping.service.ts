import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
// tslint:disable-next-line: class-name
export class convertObjectIdForImportMapping {

  constructor() { }

  getValue(source, val: string) {
    let value = val;
    if (val == null || val === undefined || val === '') {
      return val;
    }
    if (source == 'sortOrder') {
      value = (parseInt(value, null) + 1).toString();
    }
    if (source == 'customerId') {
      value = 'KH' + value;
    }
    if (source == 'userId') {
      value = 'NV' + value;
    }
    if (source == 'fileList' && val && Array.isArray(val)) {
      const files = [];
      val.forEach(file => {
        files.push(file.fileId);
      });
      value = '[' + files.join(',') + ']';
    }
    return value;
  }
  setValue() {

  }
}
