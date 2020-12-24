import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from 'src/app/core/services/base/session.service';
import { UnitService } from 'src/app/core/services/system/unit.service';
import { ToastMessageService } from 'src/app/core/services/base/toastMessage.service';
import { EnumModule, EnumAction } from 'src/app/common/constants/global/Enums';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { takeUntil } from 'rxjs/operators';
import { getSelectOptions } from 'src/app/common/attributes/@Title';
import { EnumUnitStatus } from 'src/app/common/constants/system/EnumUnitStatus';
import { UnitInput } from 'src/app/core/models/system/unit.model';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.scss']
})
export class UnitEditComponent extends BaseComponent implements IModalComponent {
  data: any;
  unitId = -1;
  info: UnitInput = {
    unitName: '',
    unitStatusId: 1
  };
  error: string;
  lstStatus: OptionModel[] = getSelectOptions(EnumUnitStatus);
  statusSelected: any;
  isShowPage = true;

  constructor(
    router: Router,
    private activeRoute: ActivatedRoute,
    sessionService: SessionService,
    private unitService: UnitService,
    private toast: ToastMessageService
  ) {
    super(EnumModule.Unit, EnumAction.Add, router, sessionService);
  }

  ngOnInit() {
    super.ngOnInit();
    this.statusSelected = this.lstStatus[0].value;
    if (this.data) {
      this.unitId = this.data.unitId;
    }

    this.activeRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id && id > 0) {
        this.unitId = parseInt(id);
        this.loadInfo();
      }
    });

    if (this.unitId > 0) {
      this.loadInfo();
    }
  }

  loadInfo() {
    this.isShowPage = false;
    this.action = EnumAction.Update;
    this.unitService.getDetail(this, this.unitId)
      .subscribe(r => {
        if (r && r) {
          this.info = r;
          this.isShowPage = true;
        }
      });
  }

  save() {
    this.unitId > 0 ? this.update() : this.add();
    this.isShowPage = false;
  }
  add() {
    this.unitService.add(this, this.info)
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe(r => {
        if (r && r) {
          this.toast.success(`Thêm mới Đơn vị tính thành công!`);
          this.close.next(r);
        }
      });
      this.isShowPage = true;
  }

  update() {
    this.unitService.update(this, this.unitId, this.info)
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe(r => {
        if (r && r) {
          this.toast.success(`Cập nhật Đơn vị tính thành công!`);
          this.close.next(this.unitId);
        }
      });
      this.isShowPage = true;
  }

  @Output()
  close = new EventEmitter()
}
