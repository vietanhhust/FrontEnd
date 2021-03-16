import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
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
import { CMSGroupClientModel, CMSClientModel } from '../cmsModel/group-client.model';
import { CMSSignalRService } from '../cmsServices/signalR.service';
import { Subscription } from 'rxjs';
import { CMSBalanceComponent } from '../cmsaccount/cms-balance/cms-balance.component';
import { CMSCaptureComponent } from './cms-capture/cms-capture.component';

@Component({
  selector: 'app-cms-dashboard',
  templateUrl: './cms-dashboard.component.html',
  styleUrls: ['./cms-dashboard.component.scss']
})
export class CMSDashboardComponent extends CMSBaseComponent implements OnInit, OnDestroy {

  isShowPage: boolean = false;
  keyword: string = '';

  selectedValueTab: CMSDashboardModel = {}
  lstData: CMSDashboardModel[] = []
  lstGroupClient: CMSGroupClientModel[];
  lstClient: CMSClientModel[] = [];
  constructor(
    public popup: PopupService,
    public toase: ToastrService,
    public router: Router,
    public cmsSessionService: CMSSessionService,
    public cmsDashboardService: CMSDashboardService,
    private renderer: Renderer2,
    private cmsTimeService: CMSTimeService,
    private cmsClientService: CMSGroupClientService,
    private cmsSignalRService: CMSSignalRService,
    private toast: ToastrService
  ) {
    super(CSMEnumModule.DashboardView, EnumAction.Delete, router, cmsSessionService);
  }
  render;
  ngOnInit(): void {
    super.ngOnInit();
    this.search();
    this.signalRSubcribe();
    this.render = this.renderer.listen("body", 'keyup.space', (e) => {
      console.log(this.cmsSessionService.getCMSSession().token);
    })
  }

  search() {
    this.cmsClientService.getAllClient({ moduleId: CSMEnumModule.GroupClientView }).subscribe(lstClient => {
      this.lstClient = lstClient;
      this.cmsClientService.searchGroupClient({ moduleId: CSMEnumModule.GroupClientView }, '').subscribe(lstGroupClient => {
        this.lstGroupClient = lstGroupClient;
        this.cmsDashboardService.searchGroupClient({ moduleId: CSMEnumModule.DashboardView }).subscribe(res => {
          this.isShowPage = true;
          this.processData(res);
        })
      })
    })
  }

  // Xử lý khi có dữ liệu mới:
  processData(lstDashboard: CMSDashboardModel[]) {

    lstDashboard.forEach(item => {
      // Tên nhóm máy
      item.clientName = "Máy " + item.clientId.toString();

      let groupId = this.lstClient.find(client => client.clientId == item.clientId).clientGroupId;
      let group = this.lstGroupClient.find(group => group.id == groupId);
      item.clientPrice = group.price;
      item.groupClientName = group.groupName;
      if (item.account) {
        item.isUsed = true;
        item.status = "Đang sử dụng";
        item.balance = this.currencyFormat(item.account.balance).split('.')[0];
        console.log(this.currencyFormat(item.account.balance));
        item.accountName = item.account.accountName;

        // Trường đăng nhập vào lúc:
        item.timeLoginString = this.cmsTimeService.unixToSecondMinuteHour(item.timeLogin);
        // Trường đã sử dụng 
        item.elapsedTimeString = new Date(item.elapsedTime * 60 * 1000).toISOString().substr(11, 8);

        if (Math.floor(item.account.balance / item.clientPrice * 60 )<= 5) {
          item.class = 'out-of-money'
        }else{
          item.class = ''
        }

      } else if (item.connectionId) {
        item.status = "Đang bật"
      } else {
        item.status = "Nghỉ"
      }
    });
    this.lstData = lstDashboard.sort((a, b) => {
      return a.clientId > b.clientId ? 1 : -1
    })
    console.log(this.lstData);
  }

  // Theo dõi khi có sự kiện đẩy đến
  dashboardSubcribe: Subscription;
  signalRSubcribe() {
    this.cmsSignalRService.signalRDashboard.subscribe(res => {
      console.log('có sự nhận');
      if (res) {
        this.processData(res);
      }
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
          if (item.account.id) {
            this.popup.open(CMSBalanceComponent, { id: item.account.id, isAddBalance: true }, res => {
            })
          }
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
        name: 'Chụp màn hình',
        icon: '',
        action: (item: CMSDashboardModel) => {
          this.popup.open(CMSCaptureComponent, {
            clientId: item.clientId,
            connectionId: item.connectionId
          }, res => {

          }, ['modal-fullscreen'])
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.DashboardView)
      },
      {
        name: 'Trừ tiền',
        icon: '',
        action: (item: any) => {
          if (item.account.id) {
            this.popup.open(CMSBalanceComponent, { id: item.account.id, isAddBalance: false }, res => {
            })
          }
        },
        isShow: this.cmsSessionService.getPermissionByFrontendCode(CSMEnumModule.AccountMinusBalance)
      }, {
        name: 'Đăng xuất',
        icon: '',
        action: (item: CMSDashboardModel) => {
          this.popup.confirm(`Hành động này sẽ đăng xuất tài khoản ${item.account.accountName} khỏi máy ${item.clientId}`).subscribe(res => {
            if (res) {
              this.cmsSignalRService.hubConnection.invoke("logoutClient", item.connectionId);
            }
          })
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
    var ar = (no).toFixed(2).split('.');
    return [
      this.numberFormat(ar[0] | 0),
      '.',
      ar[1]
    ].join('');
  }


  numberFormat(no) {
    var str = no + '';
    var ar = [];
    var i = str.length - 1;

    while (i >= 0) {
      ar.push((str[i - 2] || '') + (str[i - 1] || '') + (str[i] || ''));
      i = i - 3;
    }
    return ar.reverse().join(',');
  }

  ngOnDestroy() {
    if (this.dashboardSubcribe)
      this.dashboardSubcribe.unsubscribe();
  }
}
