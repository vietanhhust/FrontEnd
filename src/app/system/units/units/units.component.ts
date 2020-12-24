import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/base/session.service';
import { AppConfig } from 'src/app/common/config/app.config';
import { ToastMessageService } from 'src/app/core/services/base/toastMessage.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { EnumModule, EnumAction } from 'src/app/common/constants/global/Enums';
import { UnitService } from 'src/app/core/services/system/unit.service';
import { UnitEditComponent } from '../unit-edit/unit-edit.component';
import { takeUntil } from 'rxjs/operators';
import { UnitOutput } from 'src/app/core/models/system/unit.model';

@Component({
    selector: 'app-units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss']
})
export class UnitsComponent extends BaseComponent {
    isShowPage = false;
    data: UnitOutput[];
    total: number;
    pageIndex = 1;
    selectedValueTab: any;
    limit: number = AppConfig.generate.pagesize;
    keyword: string;
    isView = false;
    configTable = {
        columns: [
        {
            title: 'Mã ĐVT',
            value: 'unitId',
            isShow: true
        },
        {
            title: 'Tên ĐVT',
            value: 'unitName',
            isShow: true
        }],
        eventTable : [
            {
                name: 'Xem',
                icon: 'fa-eye',
                type: 'view',
                action: (item: any) => {
                  this.isView = true;
                  this.editModal(item);
                }
              },
            {
                name: 'Sửa',
                icon: 'fa-edit',
                action: (item: any) => {
                    this.isView = false;
                   this.editModal(item);
                }
            },
            // {
            //     name: 'Xóa',
            //     icon: 'fa-trash',
            //     action: (item: any) => {
            //        this.deleteUnit(item);
            //     }
            // },
        ]
    };

    constructor(
        router: Router,
        sessionService: SessionService,
        private unitService: UnitService,
        private toast: ToastMessageService,
        private popup: PopupService
    ) {
        super(EnumModule.Unit, EnumAction.View, router, sessionService);
        this.data = null;
    }

    ngOnInit() {
        super.ngOnInit();
        this.keyword = '';
        this.search(1);
    }
    viewmode (e) {
        this.isView = true;
        this.editModal(e);
      }

    search(page) {
        this.isShowPage = false;
        this.pageIndex = page;
        this.unitService.search(this, this.keyword, this.pageIndex, this.limit)
            .pipe(takeUntil(this.unsubcribe$))
            .subscribe(
                r => {
                    if (r) {
                        this.total = r.total;
                        this.data = r.list;
                        this.isShowPage = true;
                    }
                });
    }

    addModal() {
        let $this = this;
        this.popup.open(UnitEditComponent, { unitId: -1 }, function (unitId) {
            if (unitId) {
                $this.search($this.pageIndex);
            }
        }, ['wmedium','hmedium']);

    }
    editModal(item: UnitOutput) {
        let $this = this;
        this.popup.open(UnitEditComponent, { unitId: item.unitId , viewmode: this.isView }, function (unitId) {
            if (unitId) {
                $this.search($this.pageIndex);
            }
        }, ['wmedium','hmedium']);
    }

    deleteUnit(item: UnitOutput) {

        this.popup.confirm(`Bạn có muốn xóa đơn vị tính `+item.unitName+` không?`, `Thông báo`)
            .pipe(takeUntil(this.unsubcribe$))
            .subscribe((ok) => {
                if (ok) {
                    this.unitService.delete(this, item.unitId)
                        .subscribe(r => {
                            if (r && r) {
                                this.toast.warning(`Xóa đơn vị tính thành công!`);
                                this.search(this.pageIndex);
                            }
                        });
                }
            })
    }

    reset(){
        this.keyword='';
        this.search(1);
    }
}
