import { Component, OnInit, Input, Renderer2, ChangeDetectorRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { getSelectOptions } from 'src/app/common/attributes/@Title';
import { EnumUserStatus, EnumModule, EnumAction } from 'src/app/common/constants/global/Enums';
import { RoleService } from 'src/app/core/services/system/role.service';
import { SaveDataComponent } from 'src/app/core/models/base/saveData.component';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/core/services/base/session.service';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/core/services/system/user.service';
import { EnumStaticContent } from 'src/app/common/config/statics';
import { FileObject } from 'src/app/core/services/base/base.service';
import { BaseComponent } from 'src/app/core/models/base/base.component';
declare let $: any;
@Component({
  selector: 'user-active-info',
  templateUrl: './user-active-info.component.html',
  styleUrls: ['./user-active-info.component.scss']
})
export class UserActiveInfoComponent extends BaseComponent implements OnInit {

  image;
  form: any;
  @Input() data: any;
  @Input() id: number;
  @Input() frm: NgForm;
  @Input() isView: boolean;

  lstRole: any[];
  lstUserStatus: OptionModel[] = getSelectOptions(EnumUserStatus);

  constructor(private roleservice: RoleService, public router: Router,
    private userservice: UserService, public sessionService: SessionService,
    private store: Store<any>, private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef
  ) {

    super(EnumModule.User, EnumAction.Update, router, sessionService);
  }

  ngOnInit() {
    this.store.select('userManager').subscribe(storeData => {
      if (!storeData.userInfo)
        return;

      if (storeData.roles && !this.lstRole) {
        this.processRole(storeData.roles);

        this.changeDetectorRef.detectChanges();
      }

    })
  }

  processRole(roles) {
    this.lstRole = [];
    this.roleservice
      .getLevelTree(roles, null)
      .forEach(l => {
        this.lstRole.push(l);
      });

    this.lstRole.unshift({
      level: 0,
      info: {
        roleId: null,
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
  }

  onchange(file: FileList) {
    if (!file.item.length) {
      this.image = EnumStaticContent.NoImage;
      return;
    }

    try {
      const fileReader = new FileReader();
      fileReader.onload = (event: any) => {        
        this.data.avatarUrl =  event.target.result;
      };
      fileReader.readAsDataURL(file[0]);      
      const fobj = new FileObject(file[0], 'file');
      this.userservice.uploadAvatar(this, fobj)
        .subscribe(data => {
          this.data.avatarFileId = data;
        });
    } catch {

      this.data.avatarUrl = EnumStaticContent.NoImage;
    }

  }

}
