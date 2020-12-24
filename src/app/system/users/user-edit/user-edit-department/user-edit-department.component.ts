import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { cloneDeep } from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { EnumModule, EnumAction } from 'src/app/common/constants/global/Enums';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { SessionService } from 'src/app/core/services/base/session.service';
import { ToastMessageService } from 'src/app/core/services/base/toastMessage.service';
import { DepartmentService } from 'src/app/core/services/system/department.service';
import { UnitService } from 'src/app/core/services/system/unit.service';

@Component({
  selector: 'app-user-edit-department',
  templateUrl: './user-edit-department.component.html',
  styleUrls: ['./user-edit-department.component.scss']
})
export class UserEditDepartmentComponent extends BaseComponent implements IModalComponent {
  data: {
    departments: OptionModel[],
    info: any
  };

  info = {
    departmentId: null,
    userDepartmentMappingId: null,
    effectiveDate: null,
    expirationDate: null,
    departmentCode: null,
    departmentName: null
  };

  constructor(
    router: Router,
    private activeRoute: ActivatedRoute,
    sessionService: SessionService,
    private unitService: UnitService,
    private toast: ToastMessageService,
    private departmentService: DepartmentService
  ) {
    super(EnumModule.User, EnumAction.Add, router, sessionService);
  }

  ngOnInit() {
    super.ngOnInit();
    if (this.data.info)
      this.info = cloneDeep(this.data.info);
  }

  save() {    
    this.close.next(this.info);
  }

  @Output()
  close = new EventEmitter()
}
