import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getSelectOptions } from 'src/app/common/attributes/@Title';
import { EnumAction, EnumGender, EnumModule } from 'src/app/common/constants/global/Enums';
import { Store, select } from '@ngrx/store';
import { EnumObjectType } from 'src/app/common/constants/system/EnumObjectType';
import { UserService } from 'src/app/core/services/system/user.service';
import { GencodeConfigService } from 'src/app/core/services/system/gencodeConfig.service';
import { CustomGencodeConfigService } from 'src/app/core/services/system/customgencodeConfig.service';
import { CustomGenCodeOutputModel } from 'src/app/core/models/system/CustomGenCodeOutputModel';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/base/session.service';
import { DepartmentService } from 'src/app/core/services/system/department.service';
import { Department } from 'src/app/core/models/system/department';
import { PopupService } from 'src/app/shared/services/popup.service';
import { UserEditDepartmentComponent } from '../user-edit-department/user-edit-department.component';
import { UserInput } from 'src/app/core/models/system/user.model';
import { dateHelperService } from 'src/app/shared/services/getFirstloadDate.service';

@Component({
  selector: 'user-general-info',
  templateUrl: './user-general-info.component.html',
  styleUrls: ['./user-general-info.component.scss']
})
export class UserGeneralInfoComponent extends BaseComponent {


  @Input() frm: NgForm;
  @Input() data: UserInput;
  @Input() id: number;
  @Input() isView: boolean;

  lstGender: OptionModel[] = getSelectOptions(EnumGender);
  departments: OptionModel[] = []

  constructor(private store: Store<any>, private userservice: UserService, private render: Renderer2,
    route: Router,
    sessionService: SessionService,
    private customGenCodeConfig: CustomGencodeConfigService,
    private departmentService: DepartmentService,
    private popup: PopupService,
    private dateHelperService: dateHelperService,
    private genCodeConfig: GencodeConfigService) {
    super(EnumModule.User, EnumAction.Update, route, sessionService)
  }


  ngOnInit() {
    this.loadCustomGenCode(EnumObjectType.UserAndEmployee);

    this.loadDepartments();
  }

  generateCode() {

    this.generateCodeAndConfirm(null)
      .subscribe(r => {
        if (r) {
          this.data.employeeCode = r;
        }
      });
  }

  loadDepartments() {
    this.departmentService.search(this, '', 1, 99999, null)
      .subscribe(d => {
        d.list.unshift({ departmentId: null, departmentCode: '', departmentName: '--Chọn bộ phận--', description: '', parentName: '', isActived: false });
        d.list.forEach(p => {
          this.departments.push({ value: p.departmentId, title: p.departmentName });
        })
      })
  }

  editDepartment(info) {
    let $this = this;
    this.popup.open(UserEditDepartmentComponent, { departments: this.departments, info }, (r) => {
      if (r) {
        console.log(r)
        if (typeof (r.effectiveDate) == 'string') {
          r.effectiveDate = r.effectiveDate ? $this.dateHelperService.convertVietNamDateStringToUnix(r.effectiveDate) : null;
        }
        if (typeof (r.expirationDate) == 'string') {
          r.expirationDate = r.expirationDate ? $this.dateHelperService.convertVietNamDateStringToUnix(r.expirationDate) : null;
        }

        r.departmentName = $this.departments.find(d => d.value == r.departmentId)?.title;

        if ($this.data.departments && $this.data.departments.findIndex(d => d == info) >= 0) {
          Object.assign(info, r);
        } else {
          if (!$this.data.departments) {
            $this.data.departments = []
          }

          $this.data.departments.push(r);
        }
      }
    })

  }

  removeDepartment(info) {
    this.data.departments.splice(this.data.departments.findIndex(d => d == info), 1);
  }

}
