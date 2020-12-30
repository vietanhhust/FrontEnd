import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CMSGroupClientService } from '../../cmsServices/cms-group-client.service';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { CMSGroupClientModel } from '../../cmsModel/group-client.model';

@Component({
  selector: 'app-cms-change-group-client',
  templateUrl: './cms-change-group-client.component.html',
  styleUrls: ['./cms-change-group-client.component.scss']
})
export class CMSChangeGroupClientComponent implements OnInit, IModalComponent {

  // Nhận vào tham số là id ( group client), model là list ClientModel sẽ được chuyển sang nhóm máy khác. 
  @Input() data;
  @Output() close = new EventEmitter();
  constructor(private toast: ToastrService, private cmsSessionService: CMSSessionService,
    private cmsGroupClientService: CMSGroupClientService
  ) { }

  lstGroup: CMSGroupClientModel[] = []
  lstGroupClient: {
    title: string,
    value: number,
  }[] = []
  groupId: number = 1;
  price: number = 0;
  ngOnInit(): void {
    this.cmsGroupClientService.searchGroupClient({ moduleId: CSMEnumModule.GroupClientView }, '').subscribe(res => {
      this.lstGroup = res;
      this.price = this.lstGroup.find(x=>x.id==1).price;
      res.forEach(item => {
        this.lstGroupClient.push({
          title: item.groupName,
          value: item.id
        })
      })
    })
  }

  save() {
    this.cmsGroupClientService.changeGroupForClient({ moduleId: CSMEnumModule.GroupClientChange }, this.groupId, this.data.model).subscribe(res => {
      this.toast.success("Đổi nhóm máy thành công");
      this.close.next(true);
    })
  }

  // Change group 
  changeGroup() {
    try{
      return this.lstGroup.find(x => x.id == this.groupId).price;
    }catch{
      return "";
    }
  }
}
