import { Component, OnInit, Input, EventEmitter, Output, Renderer2, OnDestroy } from '@angular/core';
import { CMSGroupClientService } from '../../cmsServices/cms-group-client.service';
import { ToastrService } from 'ngx-toastr';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CMSGroupClientModel } from '../../cmsModel/group-client.model';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';

@Component({
  selector: 'app-cms-group-client-put',
  templateUrl: './cms-group-client-put.component.html',
  styleUrls: ['./cms-group-client-put.component.scss']
})
export class CMSGroupClientPutComponent implements OnInit, IModalComponent, OnDestroy {

  // Nhận 2 tham số là group Id và isAdd
  @Input() data;
  @Output() close = new EventEmitter();

  groupClientModel: CMSGroupClientModel = {
    id: 0, description: '', price: 0, groupName: ''
  }
  constructor(private cmsGroupClientService: CMSGroupClientService, private toast: ToastrService, 
    private renderer: Renderer2) { }

  ngOnInit(): void {
    if(!this.data.isAdd){
      this.cmsGroupClientService.getGroupClientDetail({moduleId: CSMEnumModule.GroupClientView}, this.data.id).subscribe(res=>{
        this.groupClientModel = res; 
      })
    }
    this.sub = this.renderer.listen('body', "keyup.space", (e)=>{
      console.log(this.testDate);
      console.log(this.testDateTime);
    })
  }

  save(){
    if(this.data.isAdd){
      this.cmsGroupClientService.createGroupClient({moduleId: CSMEnumModule.GroupClientCreate}, this.groupClientModel).subscribe(res=>{
        this.toast.success("Tạo mới nhóm máy thành công");
        this.close.next(true);
      })
    }else{
      this.cmsGroupClientService.putGroupClient({moduleId: CSMEnumModule.GroupClientPut}, this.data.id, this.groupClientModel).subscribe(res=>{
        this.toast.success("Cập nhật nhóm máy thành công"); 
        this.close.next(true);
      })
    }
  }


  // Unix
  testDate;

  // Date-time
  testDateTime; 
  sub; 
  ngOnDestroy(){
    this.sub(); 
  }
}
