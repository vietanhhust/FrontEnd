import { Injectable } from '@angular/core';
import fromUnixTime from 'date-fns/fromUnixTime';
import getUnixTime from 'date-fns/getUnixTime';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import vi from 'date-fns/locale/vi';
import startOfToday from 'date-fns/startOfToday';
import subMonths from 'date-fns/subMonths';
import isValid from 'date-fns/isValid';
import differenceInDays from 'date-fns/differenceInDays';
@Injectable({
  providedIn: 'root' 
})
// tslint:disable-next-line: class-name
export class dateHelperService {
  toDate: string;
  fromDate: string;
  test;
  constructor() { }

  getConvertedUnixDate(d, f?) {
    if (!f) {
      f = 'dd/MM/yyyy';
    }
    f = f.replace(/Y/g, 'y').replace(/D/g, 'd');
    return (getUnixTime(parse(d, f, new Date(), { locale: vi }))) as any;
  }

  parseInputDate(date: number | string) {
    if (isNaN(date as number)) {
      return this.convertVietNamDateStringToUnix(date as string);
    }else{
      return date;
    }
  }
  convertVietNamDateStringToUnix(dateString: string) {
    return this.getConvertedUnixDate(dateString);
  }

  convertUnixToVietNamDateString(unix: number) {
    return this.getUnixDate(unix);
  }

  getNow() {
    return new Date();
  }

  getNowUnix() {
    return this.dateTimeToUnix(this.getNow());
  }

  dateTimeToUnix(date: Date) {
    return Math.floor(date.getTime() / 1000);
  }

  unixToDate(unixInSeconds: number) {
    return new Date(unixInSeconds * 1000);
  }

  getUnixDate(d, f?) {
    if (!f) {
      f = 'dd/MM/yyyy';
    }
    f = f.replace(/Y/g, 'y').replace(/D/g, 'd');
    if (!d) {
      return '';
    }
    if (d && d.toString().match(/[ !@#$%^&*()_+\=\[\]{};':"\\|,.<>\?]/g) !== null) {
      return '';
    }
    if ((d.toString().includes('/') || d.toString().includes('-'))) {
      if (!isValid(parse(d, f, new Date(), { locale: vi }))) {
        return '';
      }
      return format(fromUnixTime(getUnixTime(parse(d, f, new Date(), { locale: vi }))), f, { locale: vi });
    }
    return format(fromUnixTime(d), f, { locale: vi });
  }

  convertFormatDate(d, f1, f2) {
    if (typeof d === 'object') {
      return format(d, f2, { locale: vi });
    } else {
      if (d) {
        return format(parse(d, f1, new Date(), { locale: vi }), f2, { locale: vi });
      }
    }
  }

  getFirstloadDate() {
    this.toDate = format(startOfToday(), 'dd/MM/yyyy', { locale: vi });
    this.fromDate = format(subMonths(new Date(), 1), 'dd/MM/yyyy', { locale: vi });
    const rs = {
      to: this.toDate,
      from: this.fromDate
    };
    return rs;
  }

  getFromMonth(m) {
    return format(subMonths(new Date(), m), 'dd/MM/yyyy', { locale: vi });
  }
  checkValidDate(m, f?) {
    if (!f) {
      f = 'dd/MM/yyyy';
    }
    f = f.replace(/Y/g, 'y').replace(/D/g, 'd');
    return isValid(parse(m, f, new Date(), { locale: vi }));
  }

  getStartQuader(key) {
    switch (key) {
      case '1':
        return '01/01/2000';
      case '2':
        return '01/04/2000';
      case '3':
        return '01/07/2000';
      case '4':
        return '01/10/2000';
      default:
        break;
    }
  }
  getEndQuader(key) {
    switch (key) {
      case '1':
        return '31/03/2000';
      case '2':
        return '30/06/2000';
      case '3':
        return '30/09/2000';
      case '4':
        return '31/12/2000';
      default:
        break;
    }
  }

  startOfMonth(date) {
    return format(new Date(new Date().getFullYear(), (parseFloat(date) - 1), 1), 'dd/MM/yyyy', { locale: vi });
  }
  endOfMonth(date) {
    return format(new Date((new Date(new Date().getFullYear(), parseFloat(date), 1)) as any - 1), 'dd/MM/yyyy', { locale: vi });
  }
  differenceInToDays(e) {
    const start = this.getFirstloadDate().to;
    const end = this.getUnixDate(e);
    return differenceInDays(parse(start, 'dd/MM/yyyy', new Date(), { locale: vi }), parse(end, 'dd/MM/yyyy', new Date(), { locale: vi }));
  }
}
