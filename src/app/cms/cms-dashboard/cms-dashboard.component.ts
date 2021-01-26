import { Component, OnInit, Renderer2 } from '@angular/core';
import { CMSBaseComponent } from 'src/app/core/models/base/CMSBase.component';
import { PopupService } from 'src/app/shared/services/popup.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { EnumAction } from 'src/app/common/constants/global/Enums';
import { CMSDashboardService } from '../cmsServices/cms-dashboard.service';
import { CMSDashboardModel } from '../cmsModel/dashBoard.model';
import { CMSTimeService } from '../cmsServices/cms-time.service';
import { CMSGroupClientService } from '../cmsServices/cms-group-client.service';

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
  lstClient;
  constructor(
    public popup: PopupService,
    public toase: ToastrService,
    public router: Router,
    public cmsSessionService: CMSSessionService,
    public cmsDashboardService: CMSDashboardService,
    private renderer: Renderer2,
    private cmsTimeService: CMSTimeService,
    private cmsClientService: CMSGroupClientService
  ) {
    super(CSMEnumModule.DashboardView, EnumAction.Delete, router, cmsSessionService);
  }
  render;
  ngOnInit(): void {
    super.ngOnInit();
    this.search();
    this.render = this.renderer.listen("body", 'keyup.space', (e) => {
      this.lstData.forEach(item => item.class = '');
    })
  }

  search() {
    this.cmsDashboardService.searchGroupClient({ moduleId: CSMEnumModule.DashboardView }).subscribe(res => {
      this.isShowPage = true;
      this.lstData = res;
    })
  }

  // Xử lý khi có dữ liệu mới:
  processDate(lstDashboard: CMSDashboardModel[]) {

    lstDashboard.forEach(item => {
      // Tên nhóm máy
      item.clientName = "Máy " + item.clientId.toString();
    
      if (item.account) {
        item.isUsed = true;
        item.status = "Đang sử dụng";
        item.balance = item.account.balance?this.currencyFormat(item.account.balance).split('.')[0]: '';
        item.accountName = item.account.accountName;

        // Trường đăng nhập vào lúc:
        item.timeLoginString = this.cmsTimeService.unixToSecondMinuteHour(item.elapsedTime);
        // Trường đã sử dụng 
        item.elapsedTimeString = new Date(item.elapsedTime * 60 * 1000).toISOString().substr(11, 8);
      } else if (item.connectionId) {
        item.status = "Đang bật"
      } else {
        item.status = "Nghỉ"
      }
    });
    this.lstData = lstDashboard.sort((a, b) => {
      return a.clientId > b.clientId ? 1 : -1
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
        title: "Số dư",
        value: "balance",
        isShow: true
      }, {
        title: "Bắt đầu",
        value: "timeLoginString",
        isShow: true
      }, {
        title: "Đã sử dụng",
        value: "elapsedTimeString",
        isShow: true
      },
      {
        title: "Nhóm máy",
        value: "groupClientName",
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
  viewmode(e: any) {

  }









  // format tiền 
  currencyFormat(no) {
    var ar = +(no).toFixed(2).split('.');
    return [
        this.numberFormat(ar[0]|0),
        '.', 
        ar[1]
    ].join('');
  }
  
  
  numberFormat(no) {
    var str = no + '';
    var ar = [];
    var i  = str.length -1;
  
    while( i >= 0 ) {
      ar.push( (str[i-2]||'') + (str[i-1]|| '')+ (str[i]|| ''));
      i= i-3;
    }
    return ar.reverse().join(',');  
  }
}
