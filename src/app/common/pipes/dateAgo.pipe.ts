import { PipeTransform, Pipe } from '@angular/core';
import { dateHelperService } from 'src/app/shared/services/getFirstloadDate.service';
@Pipe({
    name: 'dateAgo', pure: false
  })

export class DateAgoPipe implements PipeTransform {
  constructor (private dateHelperService: dateHelperService) {
  }
    transform(value: any, args?: any): any {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
            if (seconds < 29) { // less than 30 seconds ago will show as 'Just now'
                return 'Vừa xong';
            }
            if (seconds > 86400) { // more than 86400 seconds ago will show as 'fulldate'
            return this.dateHelperService.getUnixDate(value);
        }
            const intervals = {
               // 'năm': 31536000,
               // 'tháng': 2592000,
               // 'tuần': 604800,
                'ngày': 86400,
                'giờ': 3600,
                'phút': 60,
                'giây': 1
            };
            let counter;
            // tslint:disable-next-line: forin
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0) {
                    if (counter === 1) {
                        return counter + ' ' + i + ' trước'; // singular (1 day ago)
                    } else {
                        return counter + ' ' + i + ' trước'; // plural (2 days ago)
                    }
                }
            }
        }
        return value;
    }
}
