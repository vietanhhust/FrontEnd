import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnumObjectType } from 'src/app/common/constants/system/EnumObjectType';
import { UserService } from 'src/app/core/services/system/user.service';
import { RoleService } from 'src/app/core/services/system/role.service';
import { EnumModule, EnumGender, EnumUserStatus, EnumAction } from 'src/app/common/constants/global/Enums';
import { SaveDataComponent } from 'src/app/core/models/base/saveData.component';
import { getSelectOptions } from 'src/app/common/attributes/@Title';
import { SessionService } from 'src/app/core/services/base/session.service';
import { takeUntil } from 'rxjs/operators';
import { NgForm } from '@angular/forms';
import { ToastMessageService } from 'src/app/core/services/base/toastMessage.service';
import { Module, RoleOutput } from 'src/app/core/models/system/role.model';
import { UserOutput } from 'src/app/core/models/system/user.model';
import { EnumStaticContent } from 'src/app/common/config/statics';
import { BaseComponent } from 'src/app/core/models/base/base.component';
declare let $: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent {

  error: string;
  data: UserOutput = {
    userId: null,
    avatarUrl: EnumStaticContent.NoImage
  };
  userId: string;
  isShowPage = false;
  lstRole: any[] = [];
  roleSelected: RoleOutput;
  genderSelected: OptionModel;
  lstGender: OptionModel[] = getSelectOptions(EnumGender);
  lstUserStatus: OptionModel[] = getSelectOptions(EnumUserStatus);
  userStatusSelected: OptionModel;

  constructor(
    private route: ActivatedRoute,
    router: Router,
    sessionService: SessionService,
    private userservice: UserService,
    private roleservice: RoleService,
    private toast: ToastMessageService,
    private renderer: Renderer2
  ) {
    super(EnumModule.Me, EnumAction.View, router, sessionService);
  }

  ngOnInit() {
    super.ngOnInit();

    this.isShowPage = false;
    this.roleservice.getAll(this, '', 1, 9999)
      .subscribe(r => {
        if (r) {
          this.roleservice
            .getLevelTree(r.list, null)
            .forEach(l => {
              this.lstRole.push(l);
            });

          this.lstRole.unshift({
            level: 0,
            info: {
              roleId: 0,
              roleName: 'Chọn nhóm quyền '
            }
          });

          this.lstRole = this.lstRole.map(m => {
            const option = {
              value: m.info.roleId,
              title: this.getDash(m.level - 1) + m.info.roleName
            } as OptionModel;
            return option;
          });
          this.route.paramMap.subscribe(params => {
            this.userId = params['id'];
            this.loadUser(this.userId);
          });
        }
      });

  }

  loadUser(userid: string) {
    this.userId = userid;
    this.userservice.getInfo(this)
      .subscribe(
        result => {
          if (!result) {
            return;
          }
          this.isShowPage = true;
          this.data = result;
          this.loadAvatar();
        });
  }

  getRole(id) {
    try {
      return this.lstRole.find(x => x.value == id).title;
    } catch {
      return ''
    }
  }

  loadAvatar() {
    if (!this.data.avatarFileId) {
      return;
    }
  }
}
