import { Component, OnInit, Renderer2 } from '@angular/core';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { Router } from '@angular/router';
import { CMSBaseComponent } from 'src/app/core/models/base/CMSBase.component';
import { EnumAction } from 'src/app/common/constants/global/Enums';
import { PopupService } from 'src/app/shared/services/popup.service';
import { CMSGroupClientService } from '../cmsServices/cms-group-client.service';
import { CMSGroupClientModel, CMSClientModel } from '../cmsModel/group-client.model';
import { CMSGroupClientPutComponent } from './cms-group-client-put/cms-group-client-put.component';
import { ToastrService } from 'ngx-toastr';
import { CMSChangeGroupClientComponent } from './cms-change-group-client/cms-change-group-client.component';
declare let $: any;
@Component({
  selector: 'app-cms-group-client',
  templateUrl: './cms-group-client.component.html',
  styleUrls: ['./cms-group-client.component.scss']
})
export class CMSGroupClientComponent extends CMSBaseComponent implements OnInit {

  keyword = '';
  permissionEnum = CSMEnumModule;
  isShowPage = false;
  groupId: number = 0; 
  // list nhóm máy và nhóm máy. 
  lstGroupClient: CMSGroupClientModel[] = [];

  // Bảng chứa các client. 

  constructor(public cmsSessionService: CMSSessionService, public router: Router, private popup: PopupService,
    private renderer: Renderer2, private cmsGroupClientService: CMSGroupClientService,
    private toast: ToastrService
  ) {
    super(CSMEnumModule.GroupClientView, EnumAction.View, router, cmsSessionService);
  }


  ngOnInit(): void {
    super.ngOnInit();
    this.search();
  }

  // Thêm nhóm máy trạm
  addGroupClient() {
    this.popup.open(CMSGroupClientPutComponent, {
      isAdd: true
    }, res => {
      this.search(this.keyword);
    })
  }

  // search GroupClient 
  search(keyword: string = '') {
    this.cmsGroupClientService.searchGroupClient({ moduleId: CSMEnumModule.GroupClientView }, this.keyword).subscribe(res => {
      this.lstGroupClient = res,
        this.isShowPage = true;
    })
  }

  // Khi click chọn nhóm máy
  selectGroup(item: CMSGroupClientModel) {
    if(this.groupId==item.id){

    }else{
      this.isShowChangeGroupButton = false;
    }
    $('.group-item').removeClass('active');
    $('#row_' + item['id']).addClass('active');
    this.groupId = item.id;
    this.cmsGroupClientService.getClientsByGroupId({ moduleId: CSMEnumModule.GroupClientView }, item.id).subscribe(data => {
      this.lstClient = data;
      this.isShowPage = true;
    }, e => {
      this.isShowPage = true;
    })
  }

  // Sửa thông tin một nhóm máy
  updateGroupClient(item: CMSGroupClientModel) {

    this.popup.open(CMSGroupClientPutComponent, {
      id: item.id
    }, res => {

    })
  }

  // Xóa một nhóm máy
  deleteGroupClient(item: CMSGroupClientModel) {
    if (item.id == 1) {
      this.toast.error("Không thể xóa nhóm máy mặc định");
      return;
    }
    this.popup.confirm("Bạn có muốn xóa nhóm máy " + item.groupName, "Xóa nhóm máy").subscribe(ok => {
      if (ok) {
        this.cmsGroupClientService.deleteGroupClient({ moduleId: CSMEnumModule.GroupClientDelete }, item.id).subscribe(res => {
          if (res) {
            this.toast.success("Xóa nhóm máy thành công");
            this.search(this.keyword);
          }
        })
      }
    })
  }

  // Phần này là để xử lý bảng nhóm máy. 

  selectedValueTab: CMSClientModel = {};
  lstClient: CMSClientModel[] = [];

  // double-click vào bảng
  viewmode(item: CMSClientModel) {

  }

  configTable = {
    columns: [
      {
        isShow: true,
        isCheckbox: true
      },
      {
        title: "Máy số",
        value: "clientId",
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
        name: 'Chuyển nhóm máy',
        icon: 'fa-eye',
        action: (item: CMSClientModel) => {
          //this.viewmode(item);
          console.log(item);
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.AccountPut)
      },

    ]

  }

  isShowChangeGroupButton = false;
  clientCheck(){
    console.log(this.lstClient.filter(x=>x.checked==true).length);
    if(this.lstClient.filter(x=>x.checked == true).length> 0){
      this.isShowChangeGroupButton = true; 
    }else{
      this.isShowChangeGroupButton = false;
    }
  }

  changeGroupClient(){
    this.popup.open(CMSChangeGroupClientComponent, {id: this.groupId, model: this.lstClient.filter(x=>x.checked==true)}, res=>{
      this.cmsGroupClientService.getClientsByGroupId({moduleId: CSMEnumModule.GroupClientView}, this.groupId).subscribe(data=>{
        this.lstClient = data;
      })
    })
  }
}
