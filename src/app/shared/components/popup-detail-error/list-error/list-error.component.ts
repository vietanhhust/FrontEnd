import { Component, OnInit, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { ErrorLogService } from 'src/app/shared/services/errorLog.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { PopupDetailErrorComponent } from '../popup-detail-error.component';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'src/app/core/services/base/session.service';
import { Router } from '@angular/router';
import { EnumModule, EnumAction } from 'src/app/common/constants/global/Enums';
import { storage } from 'src/app/common/helpers/storage';
import { clone } from 'src/app/common/helpers/getter.helper';
import { ErrorModel } from 'src/app/core/models/system/ErrorModel';
declare let $: any;
@Component({
  selector: 'app-list-error',
  templateUrl: './list-error.component.html',
  styleUrls: ['./list-error.component.scss']
})
export class ListErrorComponent extends BaseComponent implements OnInit, IModalComponent {
  @Input() data: any;
  @Output() close = new EventEmitter();
  constructor(sessionService: SessionService,
    router: Router, private popup: PopupService, private renderer: Renderer2) {
    super(EnumModule.Me, EnumAction.View, router, sessionService)
    this.renderer.listen('body', 'keyup.space', e => {
      console.log(this.datas);
      storage.removeItem(ErrorLogService.errorKey);
    })
  }

  ngOnInit(): void {
    this.datas = clone(JSON.parse(storage.getItem(ErrorLogService.errorKey))) as ErrorModel[];
    this.datas = this.datas.reverse();
    this.datas.forEach(item=>{
      item.isClick = false
    })
  }

  // Bơm vào bảng.
  datas: ErrorModel[] = [];
  isShowPage = false;
  selectedValueTab: any;
  total: number
  configTable = {
    columns: [{
      title: "Loại lỗi",
      value: "type",
      isShow: true
    }, {
      title: "Đường dẫn",
      value: "url",
      isShow: true
    }, {
      title: "Nội dung",
      value: "content",
      isShow: true
    }],
    eventTable: []
  }

  openDetail(e: ErrorModel) {
    this.popup.open(PopupDetailErrorComponent, {
      error: e
    })
  }

  // Đổi màu change Type 
  activeRow(e: ErrorModel) {
    this.datas.forEach(item => {
      item.isClick = false;
    })
    e.isClick = true;
  }
}
