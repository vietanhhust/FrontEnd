import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubsidiaryService } from 'src/app/core/services/system/subsidiary.service';
import { RoleService } from 'src/app/core/services/system/role.service';
import { EnumModule, EnumGender, EnumUserStatus, EnumAction } from 'src/app/common/constants/global/Enums';
import { SaveDataComponent } from 'src/app/core/models/base/saveData.component';
import { SessionService } from 'src/app/core/services/base/session.service';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ToastMessageService } from 'src/app/core/services/base/toastMessage.service';
import { ToastrService } from 'ngx-toastr';
import { SubsidiaryOutputModel } from 'src/app/core/models/system/subsidiary.model';
import { PopupService } from 'src/app/shared/services/popup.service';
declare let $: any;
@Component({
  selector: 'app-subsidiary-edit',
  templateUrl: './subsidiary-edit.component.html',
  styleUrls: ['./subsidiary-edit.component.scss']
})
export class SubsidiaryEditComponent extends SaveDataComponent implements OnInit {
  listSubs: any[]
  isView = true;
  isShowPage = false;
  subSidiaryId: number;
  parentName: string = ''
  datas: SubsidiaryOutputModel = {
    address: '',
    description: '',
    email: '',
    fax: '',
    parentSubsidiaryId: null,
    phoneNumber: '',
    subsidiaryName: '',
    subsidiaryCode: '',
    taxIdNo: '',
    subsidiaryId: null,
  }
  constructor(private subsidiaryService: SubsidiaryService,
    private route: ActivatedRoute, router: Router,
    private toast: ToastrService,
    private popup: PopupService,
    sessionSerivce: SessionService) {
    super(EnumModule.Subsidiaries, EnumAction.Update, router, sessionSerivce);
  }

  @ViewChild('SubSidiaryForm', { static: false }) form: NgForm;
  ngOnInit() {
    super.ngOnInit();
    this.route.queryParamMap.subscribe(params => {
      if (params.get('viewmode') != null) {
        this.isView = true;
      }
      else if (params.get('viewmode') == null) {
        this.isView = false;
      }
    });
    this.isShowPage = false;
    this.route.params.subscribe(params => {
      this.subSidiaryId = params['id'];
      this.loadDetail(this.subSidiaryId);
    })

    this.subsidiaryService.getAll(this, '').subscribe(data => {

      this.listSubs = data.list.map(item => {
        const option = {
          value: item.subsidiaryId,
          title: item.subsidiaryName
        } as OptionModel
        return option;
      })

      this.listSubs.unshift({
        value: null,
        title: `-- Chọn công ty --`
      } as OptionModel)

      if (this.datas.parentSubsidiaryId > 0)
        this.parentName = this.getParentSubName(this.datas.parentSubsidiaryId);
    })
  }

  loadDetail(e: number) {
    this.subsidiaryService.getDetail(this, e).
      pipe(takeUntil(this.unsubcribe$)).
      subscribe(res => {
        this.datas = res;
        this.datas.parentSubsidiaryId = this.datas.parentSubsidiaryId ? this.datas.parentSubsidiaryId : null

        if (!this.datas.owner) {
          this.datas.ownerDisplay = `<Chưa thiết lập>`
        } else {
          this.datas.ownerDisplay = this.datas.owner.fullName + ' (' + this.datas.owner.userId + ')';
        }

        this.isShowPage = true;
      }, (e) => {
        this.toast.error("Có lỗi xảy ra");
      });
  }

  updateSub() {
    this.subsidiaryService.
      update(this, this.subSidiaryId, this.datas)
      .pipe(takeUntil(this.unsubcribe$))
      .subscribe(result => {
        if (result) {
          this.toast.success("Cập nhật thành công");
          this.router.navigate(['/system/subsidiary']);
        } else {
          this.toast.error("Cập nhật không thành công");
        }
      })
  }

  getParentSubName(id: number) {
    if (!this.listSubs) return '';
    let info = this.listSubs.find(x => x.value == id);
    if (info) return info.title;
    return '';
  }

 

}
