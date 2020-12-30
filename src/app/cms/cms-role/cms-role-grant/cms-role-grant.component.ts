import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CMSRoleService } from '../../cmsServices/cms-role.service';
import { ToastrService } from 'ngx-toastr';
import { CMSRoleActiveModel } from '../../cmsModel/role.model';
import { forkJoin } from 'rxjs';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
declare let $: any; 
@Component({
  selector: 'app-cms-role-grant',
  templateUrl: './cms-role-grant.component.html',
  styleUrls: ['./cms-role-grant.component.scss']
})
export class CMSRoleGrantComponent implements OnInit, IModalComponent {

            // Nhận 2 tham số là id: groupRoleId, và groupRoleName là tên nhóm quyền
  @Input() data; 
  @Output() close = new EventEmitter(); 
  keyword = '';
  isShowPage = false;
  lstRole: CMSRoleActiveModel[] = []
  constructor(private cmsRoleService: CMSRoleService, private toast: ToastrService) { 
  }

  ngOnInit(): void {
    this.search(this.keyword);
  }

  // 
  search(keyword= ''){
    this.cmsRoleService.getRoleActiveByGroupId({moduleId: CSMEnumModule.GroupRoleView}, this.data.id, keyword).subscribe(data=>{
      this.lstRole = data;
    });
  }

  tableConfig = {
    columns: [
      {
        title: 'Tên quyền',
        value: 'frontendRoleName', 
        isCheckBox: false
      }, {
        title: 'Được phép', 
        value: 'isActive', 
        isCheckBox: true
      }
    ]
  }

  // dbl click vào nhóm quyền 
  onDbClick(item: CMSRoleActiveModel){
  }

  //
  highlight(i) {
    $('.ccid').removeClass('active');
    $('#row_' + i['frontendCode'] ).addClass('active');
  }

  saveRole(){
    this.cmsRoleService.updateRoleActiveByGroupId({moduleId: CSMEnumModule.RoleActiveUpdate},this.data.id ,this.lstRole).subscribe(res=>{
      this.toast.success("Phân nhóm quyền thành công");
      this.close.next(true);
    })
  }
}
