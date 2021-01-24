import { Component, OnInit } from '@angular/core';
import { CMSBaseComponent } from 'src/app/core/models/base/CMSBase.component';
import { PopupService } from 'src/app/shared/services/popup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { EnumAction } from 'src/app/common/constants/global/Enums';
import { CMSDashboardService } from '../cmsServices/cms-dashboard.service';
import { CMSDashboardModel } from '../cmsModel/dashBoard.model';

@Component({
  selector: 'app-cms-dashboard',
  templateUrl: './cms-dashboard.component.html',
  styleUrls: ['./cms-dashboard.component.scss']
})
export class CMSDashboardComponent extends CMSBaseComponent implements OnInit {

  isShowPage: boolean = false;
  keyword: string = '';

  selectedValueTab: CMSDashboardModel = {}
  lstData: CMSDashboardModel[] = []
  constructor(
    public popup: PopupService, 
    public toase: ToastrService, 
    public router: Router, 
    public cmsSessionService: CMSSessionService, 
    public cmsDashboardService: CMSDashboardService
    
  ) {
    super(CSMEnumModule.DashboardView, EnumAction.Delete, router, cmsSessionService);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.search(); 
  }

  search(){
    this.cmsDashboardService.searchGroupClient({moduleId: CSMEnumModule.DashboardView}).subscribe(res=>{
      this.isShowPage = true; 
      this.lstData = res;
      this.lstData.forEach(item=>{
        item.clientName = "Máy " + item.clientId.toString();
        if(item.account){
          item.isUsed =  true; 
          item.status = "Đang sử dụng", 
          item.balance = item.account.balance, 
          item.accountName = item.account.accountName
        }else if(item.connectionId){
          item.status = "Đang bật"
        }else{
          item.status = "Nghỉ"
        }
      })

      this.lstData.sort((a,b)=>{
        return a.clientId > b.clientId?1: -1
      })
    })
  }

  configTable = {
    columns: [
      {
        title: "Máy trạm",
        value: "clientName",
        isShow: true
      },
      {
        title: "Trạng thái",
        value: "status",
        isShow: true
      },
      {
        title: "Tài khoản",
        value: "accountName",
        isShow: true
      }, 
      {
        title:  "Số dư", 
        value: "balance", 
        isShow: true
      }
    ],

    eventTable: [
      {
        name: 'Tắt máy',
        icon: '',
        action: (item: any) => {
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.DashboardView)
      },
      {
        name: 'Nạp tiền',
        icon: '',
        action: (item: CMSDashboardModel) => {
          
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.DashboardView)
      },
      {
        name: 'Tắt ứng dụng',
        icon: '',
        action: (item: any) => {
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.DashboardView)
      },
      {
        name: 'Nhắn tin',
        icon: '',
        action: (item: any) => {
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.DashboardView)
      }, 
      {
        name: 'Chỉnh volumn',
        icon: '',
        action: (item: any) => {
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.DashboardView)
      }, {
        name: 'Điều khiển màn hình',
        icon: '',
        action: (item: any) => {
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.DashboardView)
      }, 
      {
        name: 'Trừ tiền',
        icon: '',
        action: (item: any) => {
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.DashboardView)
      }, {
        name: 'Đăng xuất',
        icon: '',
        action: (item: any) => {
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.DashboardView)
      }
    ]

  }


  // dbl Click 
  viewmode(e: any){

  }
}
