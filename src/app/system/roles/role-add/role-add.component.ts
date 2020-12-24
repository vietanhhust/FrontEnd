import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/system/user.service';
import { RoleService } from 'src/app/core/services/system/role.service';
import { EnumModule, EnumAction, EnumRoleStatus } from 'src/app/common/constants/global/Enums';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { SessionService } from 'src/app/core/services/base/session.service';
import { getSelectOptions } from 'src/app/common/attributes/@Title';
import { Module, RoleInput } from 'src/app/core/models/system/role.model';
import { Store } from '@ngrx/store';
import { addRoleGroup } from '../role-store/role.actions';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.scss']
})
export class RoleAddComponent extends BaseComponent {

  error: string;
  data: RoleInput;
  lstRoleParent: any = [];
  isShowPage = false;
  lstRoleStatus = getSelectOptions(EnumRoleStatus);
  roleStatusSelected: OptionModel;
  rout: Router;
  @Output() close =new EventEmitter();
  constructor(
    router: Router,
    sessionService: SessionService,
    private roleservice: RoleService,
    private store: Store
  ) {
    super(EnumModule.Role, EnumAction.Add, router, sessionService);
    this.rout = router
  }

  ngOnInit() {
    super.ngOnInit();
    this.error = '';
    this.isShowPage = true;
    this.data = {
      roleName: '',
      description: '',
      roleStatusId: 0,
      parentRoleId: 0,
      isModulePermissionInherit: true,
      isDataPermissionInheritOnStock: true,
      checked: false,
      roleStatus: '',
      rootPath: ''
    };
    this.loadParent();
  }
  loadParent() {
    this.roleservice.getAll(this, '', 1, 9999)
      .subscribe(
        r => {
          if (r) {
           // this.lstRoleParent = r.data.list;
            this.roleservice.getLevelTree(r.list, null)
                        .forEach(l => {
                          this.lstRoleParent.push(l);
            });
            this.lstRoleParent.unshift({
              level: 0,
              info: {
                roleId: 0,
                roleName: 'Chọn nhóm quyền cha'
              }
            });
            this.lstRoleParent = this.lstRoleParent.map(m => {
              const option = {
                value: m.info.roleId,
                title: this.getDash(m.level - 1) + m.info.roleName
              } as OptionModel;
              return option;
            });
          }
        });
  }

  create() {
    this.store.dispatch(addRoleGroup({
      context: this.getContext(),
      payload: {
        component: this,
        data: this.data
      }
    }));
  }
}
