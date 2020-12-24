import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { EnumAction, EnumModule } from 'src/app/common/constants/global/Enums';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { SessionService } from 'src/app/core/services/base/session.service';

let itv;
@Component({
  selector: 'app-home',
  templateUrl: './home.page.component.html',
  styleUrls: ['./home.page.component.scss']
})
export class HomePageComponent extends BaseComponent implements OnDestroy {
  avatar: any;
  isShowPage = true;
  constructor(
    router: Router,
    sessionService: SessionService,

  ) {
    super(EnumModule.Me, EnumAction.View, router, sessionService);
    this.date = this.getdate();

  }
  itv = setInterval(() => {
    this.time = this.gettime();
  }, 1000);

  ngOnInit() {
    super.ngOnInit();
  }

  date: string;
  time: string;
  getdate() {
    const date = new Date();
    const monthNames = [
      'Tháng 1', 'Tháng 2', 'Tháng 3',
      'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7',
      'Tháng 8', 'Tháng 9', 'Tháng 10',
      'Tháng 11', 'Tháng 12'
    ];
    const DayNames = [
      'Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'
    ];
    const day = new Date().getDate();
    const monthIndex = date.getMonth();
    const dayIndex = date.getDay();
    return DayNames[dayIndex] + ', ' + day + ' ' + monthNames[monthIndex] + ' Năm ' + date.getFullYear();
  }
  gettime() {
    const date = new Date();
    const sec =
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    const minu =
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const hou =
      date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    return hou + ':' + minu + ':' + sec;
  }
  ngOnDestroy() {
    clearInterval(itv);
  }
}
