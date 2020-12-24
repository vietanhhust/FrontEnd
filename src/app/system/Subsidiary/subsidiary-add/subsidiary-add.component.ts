import { Component, OnInit, ViewChild } from '@angular/core';
import { SubsidiaryService } from 'src/app/core/services/system/subsidiary.service';
import { SaveDataComponent } from 'src/app/core/models/base/saveData.component';
import { EnumModule, EnumGender, EnumUserStatus, EnumAction } from 'src/app/common/constants/global/Enums';
import { getSelectOptions } from 'src/app/common/attributes/@Title';
import { SessionService } from 'src/app/core/services/base/session.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RoleOutput } from 'src/app/core/models/system/role.model';
import { SubsidiaryModel } from 'src/app/core/models/system/subsidiary.model';
import { ToastMessageService } from 'src/app/core/services/base/toastMessage.service';

@Component({
  selector: 'app-subsidiary-add',
  templateUrl: './subsidiary-add.component.html',
  styleUrls: ['./subsidiary-add.component.scss']
})
export class SubsidiaryAddComponent extends SaveDataComponent implements OnInit {

  @ViewChild('SubSidiaryForm', { static: false }) form: NgForm;
  data: SubsidiaryModel = {
    address: '',
    description: '',
    fax: '',
    parentSubsidiaryId: null,
    email: '',
    phoneNumber: '',
    subsidiaryCode: '',
    subsidiaryName: '',
    taxIdNo: '',
    subsidiaryId: null
  }


  isShowPage = false;
  lstRole: any[];
  roleSelected: RoleOutput;
  userStatusSelected: any;
  listSubs: any[]
  constructor(private subsidiaryService: SubsidiaryService,
    sessionService: SessionService, router: Router,
    private toast: ToastMessageService
  ) {
    super(EnumModule.Subsidiaries, EnumAction.Add, router, sessionService)
  }

  ngOnInit() {
    super.ngOnInit();
    this.sessionService.getCurentPermission();
    this.isShowPage = true;
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
      } as OptionModel);

    })
  }

  @ViewChild('userForm')
  userForm: NgForm;

  @ViewChild('SubSidiaryForm')
  SubSidiaryForm: NgForm;

  create(e) {
    this.subsidiaryService.add(this, this.data).
      subscribe(res => {
        if (res) {
          this.toast.info(`Thêm công ty thành công!`);
          this.router.navigate(['/system/subsidiary/']);
        }
      });
  }

}
