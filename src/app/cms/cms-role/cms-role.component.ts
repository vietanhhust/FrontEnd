import { Component, OnInit, Renderer2 } from '@angular/core';
import { CMSGroupRoleModel } from '../cmsModel/role.model';
import { CMSRoleService } from '../cmsServices/cms-role.service';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { PopupService } from 'src/app/shared/services/popup.service';
import { ToastrService } from 'ngx-toastr';
import { CMSBalanceComponent } from '../cmsaccount/cms-balance/cms-balance.component';
import { CMSBaseComponent } from 'src/app/core/models/base/CMSBase.component';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { EnumAction } from 'src/app/common/constants/global/Enums';
import { Router } from '@angular/router';
import { CMSRoleEditComponent } from './cms-role-edit/cms-role-edit.component';
import { CMSRoleGrantComponent } from './cms-role-grant/cms-role-grant.component';

@Component({
  selector: 'app-cms-role',
  templateUrl: './cms-role.component.html',
  styleUrls: ['./cms-role.component.scss']
})
export class CMSRoleComponent extends CMSBaseComponent implements OnInit {

  keyword: string = '';
  isShowPage = false;
  permissionEnum = CSMEnumModule;
  selectedValueTab: CMSGroupRoleModel = {
    id: 0
  }
  // Data vào bảng.
  lstGroupRole: CMSGroupRoleModel[] = []
  constructor(public cmsRoleService: CMSRoleService, public cmsSessionService: CMSSessionService,
    public router: Router,public popup: PopupService, public renderer: Renderer2, public toast: ToastrService) {
      super(CSMEnumModule.GroupRoleView, EnumAction.View, router, cmsSessionService);
  }

  ngOnInit(): void {
    // Phải gọi cái này, k thì k check quyền được. 
    super.ngOnInit(); 
    this.search(); 
  }

  ngOnDestroy(){

  }

  // Tìm kiếm nhóm quyền
  search(keyword: string=''){
    this.cmsRoleService.searchGroupRole({moduleId: CSMEnumModule.GroupRoleView}, keyword).subscribe(res=>{
      this.lstGroupRole = res;
      this.isShowPage = true; 
    }, e=>{
      this.isShowPage = true;
    }) 
  }

  // Thêm nhóm quyền mới. 
  addGroupRole(){
    this.popup.open(CMSRoleEditComponent, {isAdd: true}, (res)=>{
      this.search(this.keyword);
    })
  }

  viewmode(e: CMSGroupRoleModel){
    console.log(e);
  }

  configTable = {
    columns: [
      {
        title: "Tên nhóm quyền",
        value: "groupName",
        isShow: true
      },
      {
        title: "Mô tả",
        value: "description",
        isShow: true
      }
      
    ],

    eventTable: [
      {
        name: 'Sửa',
        icon: 'fa-eye',
        action: (item: CMSGroupRoleModel) => {
          if(item.id==2 ||item.id==1){
            this.toast.error("Nhóm quyền không thể sửa", "Không thể sửa");
            return;
          }
          this.popup.open(CMSRoleEditComponent, {id: item.id, isAdd: false}, res=>{
            this.search(this.keyword);
          })
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.GroupRolePut)
      },
      {
        name: 'Xóa',
        icon: 'fa-trash',
        action: (item: CMSGroupRoleModel) => {
          if(item.id == 1|| item.id==2){
            this.toast.error("Nhóm quyền không thể xóa", "Không thể xóa");
            return;
          }
          this.popup.confirm("Bạn có muốn xóa tài khoản này không", "Xóa " + item.groupName).subscribe(data => {
            if (data) {
              this.cmsRoleService.deleteGroupRole({ moduleId: CSMEnumModule.GroupRoleDelete }, item.id).subscribe(res => {
                if (res) {
                  this.toast.success("Xóa nhóm quyền thành công");
                  this.search(this.keyword);
                }
              })
            }
          })
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.GroupRoleDelete)
      },
      {
        name: 'Tạo mới',
        icon: 'fa-plus',
        action: (item: any) => {
          this.addGroupRole(); 
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.GroupRoleCreate)
      },
      {
        name: 'Trao quyền',
        icon: 'fa-tasks',
        action: (item: CMSGroupRoleModel) => {
          this.popup.open(CMSRoleGrantComponent, {id: item.id, groupRoleName: item.groupName}, res=>{
            this.search(this.keyword); 
          });
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.AccountAddBalance)
      }
    ]

  }
}
