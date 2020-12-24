import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { EnumModule, EnumAction } from 'src/app/common/constants/global/Enums';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from 'src/app/core/services/base/session.service';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/shared/services/popup.service';
import { SubsidiaryService } from 'src/app/core/services/system/subsidiary.service';
import { AppConfig } from 'src/app/common/config/app.config';
import { takeUntil } from 'rxjs/operators';
import { PagingData } from 'src/app/core/models/base/responedata.model';
import { SubsidiaryModel, SubsidiaryOutputModel } from 'src/app/core/models/system/subsidiary.model';
import { confirmType } from 'src/app/shared/components/editor-confirm-dialog/yesno-confirm-dialog.component';
@Component({
    templateUrl: './subsidiary.component.html',
    styleUrls: ['subsidiary.component.scss'],
    providers: []

})
export class SubsidiaryComponent extends BaseComponent {

    // Bơm vào bảng.
    data: SubsidiaryOutputModel[];
    isShowPage = false;
    selectedValueTab: any;
    configTable = {
        columns: [
            {
                title: "Mã công ty",
                value: "subsidiaryCode",
                isShow: true
            },
            {
                title: "Tên công ty",
                value: "subsidiaryName",
                isShow: true
            },
            {
                title: "Địa chỉ",
                value: "address",
                isShow: true
            },
            {
                title: "Mã số thuế",
                value: "taxIdNo",
                isShow: true
            },
            {
                title: "Số điện thoại",
                value: "phoneNumber",
                isShow: true
            },
            {
                title: "Email",
                value: "email",
                isShow: true
            },
            {
                title: "Fax",
                value: "fax",
                isShow: true
            },
            {
                title: "Tài khoản Sở hữu",
                value: "ownerDisplay",
                isShow: true
            },
            {
                title: "Mô tả",
                value: "description",
                isShow: true
            }

        ],
        eventTable: [
            {
                name: 'Xem',
                icon: 'fa-eye',
                action: (item: any) => {
                    this.router.navigate(['/system/subsidiary/edit/', item.subsidiaryId], { queryParams: { viewmode: '' } });
                    //this.popup.open(SubsidiaryViewComponent,item,(e)=>{console.log("hủy")}, {'width':'70%'},document.body);
                    console.log(item);
                }
            },
            {
                name: 'Xem(Tab mới)',
                icon: 'fa-eye',
                action: (item: any) => {
                    window.open('/system/subsidiary/edit/' + item.subsidiaryId + '?viewmode=', '_blank');
                }
            },
            {
                name: 'Sửa',
                icon: 'fa-edit',
                type: 'edit',
                action: (item: any) => {
                    this.router.navigate(['/system/subsidiary/edit', item.subsidiaryId]);
                }
            },
            {
                name: 'Xóa',
                icon: 'fa-trash',
                type: 'del',
                action: (item: any) => {

                    this.popup.yesNoConfirm('Bạn có muốn xóa công ty ' + item.subsidiaryName + " không?", 'Xóa công ty', null, "Xóa", "Hủy").subscribe(data => {
                        if (data == confirmType.confirm) {
                            this.SubsidiaryServive.delete(this, item.subsidiaryId).subscribe(res => { 
                                this.toast.warning('Xóa thành công'); 
                                this.search(1);
                            });

                        }
                    })
                }
            }
        ]
    }


    keyword = '';
    limit: number = AppConfig.generate.pagesize;
    total: number;
    pageIndex: number = 1;


    constructor(private toast: ToastrService, sessionService: SessionService,
        router: Router, private popup: PopupService, private SubsidiaryServive: SubsidiaryService) {
        super(EnumModule.Subsidiaries, EnumAction.View, router, sessionService)

    }

    ngOnInit() {
        super.ngOnInit();
        this.search(1);
        this.SubsidiaryServive.testOtherAPi(this).subscribe(data=>{
            console.log(data);
        });
    }

    viewmode(e: any) {
        this.router.navigate(['/system/subsidiary/edit', e.subsidiaryId], { queryParams: { viewmode: '' } });
    }

    search(page: any) {
        this.pageIndex = page;
        this.isShowPage = false;
        this.SubsidiaryServive.search(this, this.keyword, this.pageIndex, this.limit).
            pipe(takeUntil(this.unsubcribe$)).subscribe(res => {
                this.data = res.list;
                this.total = res.total;
                this.isShowPage = true;
                this.data.forEach(item => {
                    if (!item.owner) {
                        item.ownerDisplay = `<Chưa thiết lập>`
                    } else {
                        item.ownerDisplay = item.owner.fullName + ' (' + item.owner.userId + ')';
                    }
                })
            })
    }

    reset() {
        this.keyword = '';
        this.search(1);
    }

}
