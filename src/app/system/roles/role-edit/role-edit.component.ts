import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/core/services/system/user.service';
import { RoleService } from 'src/app/core/services/system/role.service';
import { EnumModule, EnumAction, EnumRoleStatus } from 'src/app/common/constants/global/Enums';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { SessionService } from 'src/app/core/services/base/session.service';
import { getSelectOptions } from 'src/app/common/attributes/@Title';
import { Observable, Observer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Module, RoleInput } from 'src/app/core/models/system/role.model';
import { Store } from '@ngrx/store';
import { updateRoleGroup } from '../role-store/role.actions';


@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent extends BaseComponent {

  error: string;
  @Input() data: any;
  data2: RoleInput;
  roleId: number;
  isShowPage: boolean;
  lstRoleStatus: any[] = getSelectOptions(EnumRoleStatus);
  lstRoleParent: any = [];
  roleStatusSelected: OptionModel;
  isView = false;
  constructor(
    private route: ActivatedRoute,
    router: Router,
    sessionService: SessionService,
    private userservice: UserService,
    private roleservice: RoleService,
    private toast: ToastrService,
    private store: Store<any>
  ) {
    super(EnumModule.Role, EnumAction.Update, router, sessionService);


  }

  ngOnInit() {
    super.ngOnInit();
    this.error = '';
    this.isShowPage = false;
    this.route.params.subscribe((params) => {
      const roleId = params['id'];
      if (roleId) {
        this.loadRole(roleId);
        this.loadParent();
      }
      else {
        this.loadRole(this.data.id);
        this.loadParent();
      }
    });

    //  this.loadRole(22);
    this.loadParent();
    // this.route.queryParamMap.subscribe((params) => {
    //   if (params.get('viewmode') !== null) {
    //      this.isView = true;
    //   }
    //  });
    // this.loadRole(this.data.id as number);
    // this.loadRole((this.data.id as number));
  }
  loadParent() {
    this.roleservice.getAll(this, '', 1, 9999)
      .subscribe(
        r => {
          if (r) {
            this.lstRoleParent = [];
            // this.lstRoleParent = r.data.list;
            this.roleservice.getLevelTree(r.list, this.roleId)
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
                value: m.info ? m.info.roleId : 0,
                title: m.info ? this.getDash(m.level - 1) + m.info.roleName : null
              } as OptionModel;
              return option;
            });
          }
        });
  }
  loadRole(roleId: number) {
    this.roleId = roleId;
    const sub = this.roleservice.getDetail(this, roleId)
      .subscribe(
        result => {
          if (!result) {
            sub.unsubscribe();
            this.router.navigate(['/']);
            return;
          }
          this.data2 = result;
          this.data2.parentRoleId = undefined ? 0 : this.data2.parentRoleId;
          // if (this.data.rootPath.split('_').length > 1) {
          //   const pId = this.data.rootPath.split('_')[this.data.rootPath.split('_').length - 2];
          //   this.data.parentRoleId = parseInt(pId);
          // } else {
          //   this.data.parentRoleId = 0;
          // }
          this.isShowPage = true;
        });
  }
  getRoleName(id) {
    if (id && this.lstRoleParent.length > 0) {
      return this.lstRoleParent.find(x => x.value === id).title;
    }
  }
  updateRole() {
    this.store.dispatch(updateRoleGroup({
      context: this.getContext(),
      payload: {
        roleId: this.roleId,
        data: this.data2
      }
    }))
  }
}
