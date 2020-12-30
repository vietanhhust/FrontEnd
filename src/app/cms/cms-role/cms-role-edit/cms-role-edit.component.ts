import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CMSGroupRoleModel } from '../../cmsModel/role.model';
import { CMSRoleService } from '../../cmsServices/cms-role.service';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cms-role-edit',
  templateUrl: './cms-role-edit.component.html',
  styleUrls: ['./cms-role-edit.component.scss']
})
export class CMSRoleEditComponent implements OnInit, IModalComponent {

  // nhận vào id, isAdd
  @Input() data; 
  @Output() close = new EventEmitter(); 
  groupRoleModel: CMSGroupRoleModel = {
    id: 0, 
    description: '', 
    groupName: ''
  }
  
  constructor(private cmsRoleService: CMSRoleService, private toast: ToastrService) { }

  ngOnInit(): void {
    if(!this.data.isAdd){
      this.cmsRoleService.getGroupRoleDetail({moduleId: CSMEnumModule.GroupRoleView}, this.data.id).subscribe(res=>{
        this.groupRoleModel = res;
      });
    }
  }

  save(){
    if(this.data.isAdd){
      this.cmsRoleService.createGroupRole({moduleId: CSMEnumModule.GroupRoleCreate}, this.groupRoleModel).subscribe(res=>{
        this.toast.success("Tạo mới nhóm quyền thành công");
        this.close.next(true);
      })
    }else{
      this.cmsRoleService.updateGroupRoleDetail({moduleId: CSMEnumModule.GroupRolePut}, this.data.id, this.groupRoleModel).subscribe(res=>{
        this.toast.success("Cập nhật nhóm quyền thành công");
        this.close.next(true);
      })
    }
  }
}
