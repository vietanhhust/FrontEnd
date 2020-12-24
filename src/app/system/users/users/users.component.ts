

import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/system/user.service';
import { RoleService } from 'src/app/core/services/system/role.service';
import { AppConfig } from 'src/app/common/config/app.config';
import { EnumModule, EnumUserStatus, EnumGender, EnumAction } from 'src/app/common/constants/global/Enums';
import { BaseComponent } from 'src/app/core/models/base/base.component';
import { getSelectOptions } from 'src/app/common/attributes/@Title';
import { SessionService } from 'src/app/core/services/base/session.service';
import { Store } from '@ngrx/store';
import { UserOutput } from 'src/app/core/models/system/user.model';
import { RoleOutput } from 'src/app/core/models/system/role.model';
import { PopupService } from 'src/app/shared/services/popup.service';
import { clearUpdateUserResultAction, deleteUserAction, DELETE_USER_SUCCESS, getRolesAction, getUserInfoSuccessAction, getUsersAction } from '../user-store/user.actions';
import { ToastMessageService } from 'src/app/core/services/base/toastMessage.service';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent extends BaseComponent {

  data: UserOutput[]
  dataFilled = [];
  selectedValueTab: any;
  total: number;
  pageIndex = 1;
  limit: number = AppConfig.generate.pagesize;
  keyword = '';
  configTable = {
    columns: [
      {
        title: 'Tài Khoản',
        value: 'userName',
        isShow: true
      },
      {
        title: 'Họ và Tên',
        value: 'fullName',
        isShow: true
      },
      {
        title: 'Quyền',
        value: 'role',
        isShow: true
      },
      {
        title: 'Mã nhân viên',
        value: 'employeeCode',
        isShow: true
      },
      {
        title: 'Email',
        value: 'email',
        isShow: true
      },
      {
        title: 'Điện thoại',
        value: 'phone',
        isShow: true
      },
      {
        title: 'Địa chỉ',
        value: 'address',
        isShow: true
      },
      {
        title: 'Giới tính',
        value: 'gender',
        isShow: true
      },
      {
        title: 'Trạng thái',
        value: 'userStatus',
        isShow: true
      },
    ],
    eventTable: [
      {
        name: 'Xem',
        icon: 'fa-eye',
        action: (item: any) => {
          this.router.navigate(['/system/users/edit', item.userId], { queryParams: { viewmode: '' } });
        }
      },
      {
        name: 'Xem(Tab mới)',
        icon: 'fa-eye',
        action: (item: any) => {
          window.open('/system/users/edit/' + item.userId + '?viewmode=', '_blank');
        }
      },
      {
        name: 'Sửa',
        icon: 'fa-edit',
        type: 'edit',
        action: (item: any) => {
          this.router.navigate(['/system/users/edit', item.userId]);
        }
      },
      {
        name: 'Xóa',
        icon: 'fa-trash',
        type: 'del',
        action: (item: any) => {
          this.deleteUser(item.userId);
        }
      },
    ]
  };
  lstRole: RoleOutput[];
  lstGender: OptionModel[] = getSelectOptions(EnumGender);
  lstUserStatus: OptionModel[] = getSelectOptions(EnumUserStatus);
  lstUserStatusCheck = [];
  isShowPage = false;

  listUserNgRx$;
  constructor(
    router: Router,
    sessionService: SessionService,
    private popup: PopupService,
    private store: Store<any>,
    private changeDetect: ChangeDetectorRef,
    private toast: ToastMessageService
  ) {
    super(EnumModule.User, EnumAction.View, router, sessionService);
  }
  viewmode(e) {
    this.router.navigate(['/system/users/edit', e.userId], { queryParams: { viewmode: '' } });
  }
  ngOnInit() {
    super.ngOnInit();
    this.keyword = '';

    this.getRoleData();

    this.search(1);

    getSelectOptions(EnumUserStatus).filter((x) => {
      this.lstUserStatusCheck.push(x);
    });

    this.lstUserStatusCheck.filter((x) => {
      x.checked = false;
    });

    this.store.dispatch(getUserInfoSuccessAction(this.getActionPayload({})));

    this.store.dispatch(clearUpdateUserResultAction(this.getActionPayload({})));


    this.store.select('userManager').subscribe(storeData => {

      if (storeData.roles && !this.lstRole) {
        this.lstRole = storeData.roles;
        this.changeDetect.detectChanges();
      }

      if (storeData.result) {
        switch (storeData.actionType) {
          case DELETE_USER_SUCCESS:
            this.toast.warning(`Xóa nhân viên thành công`);
            this.store.dispatch(clearUpdateUserResultAction(this.getActionPayload({})))
            this.search(this.pageIndex);
            break;
        }
      }

      if (!storeData.userPagedData)
        return;

      let r = storeData.userPagedData;
      this.data = cloneDeep(r.list);
      if (!this.data) return;

      this.total = r.total;
      this.data.forEach((x) => {
        x.gender = this.getGender(x.genderId);
        x.userStatus = this.getUserStatus(x.userStatusId);
        x.role = this.getRole(x.roleId);
      });
      this.dataFilled = this.data;
      this.isShowPage = true;
    })
  }

  getRoleData() {
    this.store.dispatch(getRolesAction(this.getActionPayload({})));
  }

  checkItemSearch() {
    this.dataFilled = [];
    let count = 0;
    this.lstRole.filter((x) => {
      if (x.checked === true) {
        count++;
        const lst = this.data.filter(z => z.roleId == x.roleId);
        this.dataFilled.push(...lst);
      }
    });
    this.lstUserStatusCheck.filter((x) => {
      x.checked = false;
    });
    if (count == 0) {
      this.dataFilled = this.data;
    }
  }
  uncheckFilter(item) {
    this.lstRole.filter((x) => {
      if (x === item) {
        x.checked = false;
      }
    });
    this.dataFilled = [];
    let count = 0;
    this.lstRole.filter((x) => {
      if (x.checked === true) {
        count++;
        const lst = this.data.filter(z => z.roleId == x.roleId);
        this.dataFilled.push(...lst);
      }
    });

    if (count == 0) {
      this.dataFilled = this.data;
    }
  }
  checkItemSearch2() {
    this.dataFilled = [];
    let count = 0;
    this.lstUserStatusCheck.filter((x) => {
      if (x.checked === true) {
        count++;
        const lst = this.data.filter(z => z.userStatusId === x.value);
        this.dataFilled.push(...lst);
      }
    });
    this.lstRole.filter((x) => {
      x.checked = false;
    });
    if (count == 0) {
      this.dataFilled = this.data;
    }
  }
  search(page) {
    this.isShowPage = false;
    this.pageIndex = page;

    this.store.dispatch(getUsersAction(this.getActionPayload({ keyword: this.keyword, page: this.pageIndex, size: this.limit })));
  }

  getRole(role: number) {
    if (!this.lstRole) return '';
    const roleSelect = this.lstRole.find(x => x.roleId === role);
    return roleSelect ? roleSelect.roleName : '';
  }

  getGender(gender: number) {
    const genderSelect = this.lstGender.find(x => x.value === gender);
    return genderSelect ? genderSelect.title : '';
  }
  getUserStatus(status: number) {
    const userStatusSelect = this.lstUserStatus.find(x => x.value === status);
    return userStatusSelect ? userStatusSelect.title : '';
  }

  reset() {
    this.keyword = '';
    this.search(1);
  }

  deleteUser(userId: number) {
    this.store.dispatch(
      deleteUserAction(
        this.getActionPayload({
          userId: userId
        })
      )
    );
  }

  
}
