import { OnInit, OnChanges, Renderer2, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
@Injectable({
    providedIn: 'root'
})
export class CMSTimeService {
    constructor(private cmsSessionService: CMSSessionService) {
    }

    unixToHumanDate(stamp: number): Date {
        let milliseconds = stamp * 1000 // 1575909015000
        let dateObject = new Date(milliseconds);
        return dateObject;
    }

    // Giờ chuẩn sang ngày tháng năm
    unixToDDMMYYYY(stamp: number): string {
        let milliseconds = stamp * 1000
        let dateObject = new Date(milliseconds);

        let day = dateObject.getDate() < 10 ? ('0' + dateObject.getDate().toString()) :
            (dateObject.getDate());

        let month = (dateObject.getMonth() + 1) < 10 ? ('0' + (dateObject.getMonth() + 1).toString()) :
            (dateObject.getMonth() + 1).toString();

        let year = dateObject.getFullYear().toString(); 

        return day + '/' + month + '/' + year;
    }


    // Giờ chuẩn sang Giờ phút giây. 
    unixToSecondMinuteHour(stamp: number): string {
        let milliseconds = stamp * 1000
        let dateObject = new Date(milliseconds);

        let hour = dateObject.getHours() < 10 ? ('0' + dateObject.getHours().toString()) :
            (dateObject.getHours());

        let minutes = (dateObject.getMinutes()) < 10 ? ('0' + (dateObject.getMinutes()).toString()) :
            (dateObject.getMinutes()).toString();

        let second = (dateObject.getSeconds()) < 10 ? ('0' + (dateObject.getSeconds()).toString()) :
        (dateObject.getSeconds()).toString();

        return hour + ':' + minutes + ':' + second;
    }

    // Giờ chuẩn sang Ngày tháng năm giờ phút giây:
    unixToHumanDateAndHour(stamp: number){
        return this.unixToDDMMYYYY(stamp) + "," + this.unixToSecondMinuteHour(stamp);
    }

    // Lấy giờ hiện tại cho ra dạng unix 
    getCurrentUnix(){
        return Math.floor(new Date().getTime() / 1000); 
    }
}

