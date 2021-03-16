import { Component, OnInit } from '@angular/core';
import { PopupService } from 'src/app/shared/services/popup.service';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CMSAccountChooseComponent } from '../../cmsaccount/cms-account-choose/cms-account-choose.component';
import { AccountModel } from '../../cmsModel/account.model';
import { CMSTimeService } from '../../cmsServices/cms-time.service';
import { CMSAccountService } from '../../cmsServices/cms-account.service';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { CMSHistoryService } from '../../cmsServices/cms-history.service';
import { CMSHistoryBalanceChangeQueryModel, CMSHistoryBalanceChangeModel } from '../../cmsModel/history.model';
import { CMSManagingAccountService } from '../../cmsServices/cms-managingAccount.service';
import { CMSManagingAccountModel } from '../../cmsModel/managingAccount.model';

@Component({
  selector: 'app-cms-history-balance',
  templateUrl: './cms-history-balance.component.html',
  styleUrls: ['./cms-history-balance.component.scss']
})
export class CMSHistoryBalanceComponent implements OnInit {

  // Từ ngày (unix)
  dateTimeFrom;
  // Đến ngày (unix)
  dateTimeTo;
  accountName;
  accountId;

  typeChange: boolean = false;
  lstTypeChange: {
    title: string,
    value: boolean,
  }[] = [{
    title: 'Nạp tiền',
    value: false
  }, {
    title: 'Trừ tiền',
    value: true
  }
    ]

  // Dữ liệu
  lstAdminAccount: CMSManagingAccountModel[] = [];
  lstData: CMSHistoryBalanceChangeModel[] = [];
  lstAccount: AccountModel[] = [];

  isShowPage = false;
  selectedValueTab: any;
  constructor(private popup: PopupService, public cmsSessionService: CMSSessionService,
    public cmsTimeService: CMSTimeService, public cmsHistoryService: CMSHistoryService,
    public cmsAccountService: CMSAccountService, public cmsManagingAccountService: CMSManagingAccountService
  ) { }

  ngOnInit(): void {
    this.search();
  }

  chooseAccount() {
    this.popup.open(CMSAccountChooseComponent, {}, (res: AccountModel) => {
      if (res) {
        this.accountId = res.id;
        this.accountName = res.accountName;
      } else {
        this.accountId = 0;
        this.accountName = ''
      }
    })
  }


  viewmode(e: any) {

  }

  total: number = 0; 

  public search(keyword: string = '') {
    this.total = 0; 
    this.lstAccount = [];
    this.lstAdminAccount = [];
    this.cmsAccountService.getAccountByKeyword({ moduleId: CSMEnumModule.AccountView }, keyword).subscribe(data => {
      this.lstAccount = data;
      this.cmsManagingAccountService.getManagingAccount({ moduleId: 9999 }).subscribe(res => {
        this.lstAdminAccount = res;
        this.query(); 
      })
    })
  }

  query() {
    let model: CMSHistoryBalanceChangeQueryModel = {
      accountId: this.accountId,
      fromDate: this.dateTimeFrom,
      toDate: this.dateTimeTo,
      typeChange: this.typeChange
    }
    this.cmsHistoryService.getHistoryByQuery({ moduleId: 99999 }, model).subscribe(res => {
      this.lstData = res;
      this.lstData.forEach(item => {
        // Tên tài khoản
        item.accountName = this.lstAccount.find(x => x.id == item.accountId).accountName;
        // Cost string
        item.costString = this.currencyFormat(item.cost).split('.')[0];

        // typeChange
        item.typeChangeString = item.typeChange ? 'Trừ tiền' : 'Nạp tiền';

        //time Change string
        item.timeChangeString = this.cmsTimeService.unixToHumanDateAndHour(item.timeChange);
        // admin account name
        item.managinAccoungName = this.lstAdminAccount.find(ad => ad.id == item.managingAccountId).name;

        this.total += item.cost;
      })
    })
  }

  configTable = {
    columns: [
      {
        title: "Nhân viên",
        value: "managinAccoungName",
        isShow: true
      },
      {
        title: "Tài khoản",
        value: "accountName",
        isShow: true
      },
      {
        title: "Số tiền",
        value: "costString",
        isShow: true
      },
      {
        title: "Thời gian",
        value: "timeChangeString",
        isShow: true
      },
      {
        title: "Hoạt động",
        value: "typeChangeString",
        isShow: true
      }
    ],

    eventTable: []
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

 
}
