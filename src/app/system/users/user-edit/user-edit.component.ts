import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnumModule, EnumGender, EnumUserStatus, EnumAction } from 'src/app/common/constants/global/Enums';
import { SaveDataComponent } from 'src/app/core/models/base/saveData.component';
import { SessionService } from 'src/app/core/services/base/session.service';
import { NgForm } from '@angular/forms';
import { ToastMessageService } from 'src/app/core/services/base/toastMessage.service';
import { Store } from '@ngrx/store';
import { UserInput } from 'src/app/core/models/system/user.model';
import { RoleOutput } from 'src/app/core/models/system/role.model';
import { EnumStaticContent } from 'src/app/common/config/statics';
import { clearUpdateUserResultAction, getRolesAction, getUserInfoAction, getUserInfoSuccessAction, postUserAction, POST_USER_SUCCESS, putUserAction, PUT_USER_SUCCESS } from '../user-store/user.actions';
import { ChangeDetectorRef } from '@angular/core';
import { cloneDeep } from 'lodash';
import { dispatch } from 'rxjs/internal/observable/pairs';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends SaveDataComponent implements OnDestroy {

  error: string;
  data: UserInput = {
    avatarUrl: EnumStaticContent.NoImage,
    roleId: null,
    genderId: null
  }
  userId: number;
  isShowPage = false;

  genderSelected: OptionModel;
  EnumGender = EnumGender;
  EnumUserStatus = EnumUserStatus;

  @ViewChild('formAccountCreate', { static: false }) form: NgForm;
  isView = false;

  lstRole: RoleOutput[];

  constructor(
    private route: ActivatedRoute,
    router: Router,
    sessionService: SessionService,
    private toast: ToastMessageService,
    private store: Store<any>,
    private changeDetectorRef: ChangeDetectorRef


  ) {
    super(EnumModule.User, EnumAction.Update, router, sessionService);
  }


  ngOnInit() {
    super.ngOnInit();

    this.route.queryParamMap.subscribe((params) => {
      if (params.get('viewmode') !== null) {
        this.isView = true;
      } else if (params.get('viewmode') == null) {
        this.isView = false;
      }
    });

    this.error = '';
    this.isShowPage = false;

    this.getRoleData();

    this.store.dispatch(getUserInfoSuccessAction(this.getActionPayload({})));

    this.store.dispatch(clearUpdateUserResultAction(this.getActionPayload({})));

    this.route.params.subscribe((params) => {
      const userid = params['id'];
      if (userid) {
        this.userId = userid;
        this.store.dispatch(getUserInfoAction(this.getActionPayload({ userId: userid })));
      }
    });

    this.store.select('userManager').subscribe(storeData => {

      if (storeData.roles && !this.lstRole) {
        this.lstRole = storeData.roles;
        this.changeDetectorRef.detectChanges();
        if (!this.userId) {
          this.isShowPage = true;
        }
      }

      if (storeData.result) {
        switch (storeData.actionType) {
          case POST_USER_SUCCESS:
            this.store.dispatch(clearUpdateUserResultAction(this.getActionPayload({})))
            this.toast.success(`Thêm mới thành công`);            
            this.router.navigate(['/system/users/edit', storeData.result], { queryParams: { viewmode: '' } });
            break;

          case PUT_USER_SUCCESS:
            this.store.dispatch(clearUpdateUserResultAction(this.getActionPayload({})))
            this.toast.success(`Cập nhật thành công`);
            this.router.navigate(['/system/users']);
            break;
        }
      }
      if (storeData.userInfo && storeData.userInfo.userId) {
        this.data = cloneDeep(storeData.userInfo);
        this.isShowPage = true;
      }


      this.loadAvatar();

    })
  }

  getRoleData() {
    this.store.dispatch(getRolesAction(this.getActionPayload({})));
  }

  updateUser() {
    if (this.userId) {
      this.store.dispatch(putUserAction(this.getActionPayload({ userId: this.userId, userInfo: this.data })));
    } else {
      this.store.dispatch(postUserAction(this.getActionPayload({ userInfo: this.data })));
    }

  }

  loadAvatar() {
    
  }

  getRole(role: number) {
    if (!this.lstRole) return '';

    const roleSelect = this.lstRole.find(x => x.roleId === role);
    return roleSelect ? roleSelect.roleName : '';
  }
}
