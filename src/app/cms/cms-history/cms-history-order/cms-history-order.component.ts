import { Component, OnInit, Renderer2 } from '@angular/core';
import { PopupService } from 'src/app/shared/services/popup.service';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CMSHistoryService } from '../../cmsServices/cms-history.service';
import { CMSTimeService } from '../../cmsServices/cms-time.service';
import { CMSAccountService } from '../../cmsServices/cms-account.service';
import { CMSManagingAccountService } from '../../cmsServices/cms-managingAccount.service';
import { CMSAccountChooseComponent } from '../../cmsaccount/cms-account-choose/cms-account-choose.component';
import { AccountModel } from '../../cmsModel/account.model';
import { CMSManagingAccountChooseComponent } from '../cms-managing-account-choose/cms-managing-account-choose.component';
import { CMSManagingAccountModel } from '../../cmsModel/managingAccount.model';
import { CMSClientChooseComponent } from '../cms-client-choose/cms-client-choose.component';
import { CMSClientModel } from '../../cmsModel/group-client.model';
import { CMSHistoryOrderModel, BigOrderModel } from '../../cmsModel/history.model';
import { toDate, isThisSecond } from 'date-fns';
import { CMSCategoryService } from '../../cmsServices/cms-category.service';
import { CategoryItemModel } from '../../cmsModel/categoryItem.model';
import { CMSPopupDetailOrderComponent } from './cmspopup-detail-order/cmspopup-detail-order.component';

@Component({
  selector: 'app-cms-history-order',
  templateUrl: './cms-history-order.component.html',
  styleUrls: ['./cms-history-order.component.scss']
})
export class CmsHistoryOrderComponent implements OnInit {

  // query theo thời gian
  dateTimeFrom;
  dateTimeTo;

  //  Tổng tiền
  total: number = 0;

  // các trường admin, client, ...
  adminId?: number = 0;
  adminName?: string = '';

  accountId?: number = 0;
  accountName?: string = '';

  clientId?: number = 0;
  clientNumber?: number = 0;


  // List các thứ cần join với nhau. 
  lstAdmin: CMSManagingAccountModel[] = []; 
  lstClient: CMSClientModel[] = []; 
  lstAccount: AccountModel[] = [];
  lstCategoryItem: CategoryItemModel[] = []

  constructor(private popup: PopupService, public cmsSessionService: CMSSessionService,
    public cmsTimeService: CMSTimeService, public cmsHistoryService: CMSHistoryService,
    public cmsAccountService: CMSAccountService, public cmsManagingAccountService: CMSManagingAccountService,
    public cmsCategoryItemService: CMSCategoryService, private renderer: Renderer2
    ) { }

  ngOnInit(): void {
    this.search(); 
    this.renderer.listen('body', 'keyup.space', res=>{
      console.log(this.lstCategoryItem);
    })
  }


  // Chọn từ các bảng
  chooseAccount(){
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

  // Chọn từ bảng Client.
  chooseClient(){
    this.popup.open(CMSClientChooseComponent, {}, (res: CMSClientModel)=>{
      if(res){
        this.clientId = res.id, 
        this.clientNumber = res.clientId;
      }else{
        this.clientId = 0; 
        this.clientNumber = null;
      }
    })
  }


  // Chọn Admin
  chooseAdmin(){
    this.popup.open(CMSManagingAccountChooseComponent, {}, (res: CMSManagingAccountModel)=>{
      if(res){
        this.adminId = res.id; 
        this.adminName = res.name
      }else{
        this.adminId = 0; 
        this.adminName = ''
      }
    })
  }

  search(){
    this.cmsManagingAccountService.getManagingAccount({moduleId: 9999}).subscribe(admin=>{
      this.lstAdmin = admin
      this.cmsCategoryItemService.getCategoryItem({moduleId: 9999}, '').subscribe(cate=>{
        this.lstCategoryItem = cate
        this.cmsAccountService.getAccount({moduleId:9999}).subscribe(acc=>{
          this.lstAccount = acc; 
        })
      })
    })
  }


  lstData: BigOrderModel[] = []
  query(){
    this.total = 0;
    let queryModel: CMSHistoryOrderModel = {
      fromDate: this.dateTimeFrom, 
      toDate: this.dateTimeTo,
      accountId: this.accountId, 
      adminId: this.adminId, 
      clientId: this.clientId
    };
    let $this = this; 
    this.cmsHistoryService.getHistoryOrderByQuery({moduleId: 99999}, queryModel).subscribe(res=>{
      this.lstData = [];
      res.forEach(order=>{
        
        let bigOrder: BigOrderModel = {
          id: order.id,
          
          // Tên người
          accountId: order.accountId, 
          accountName: order.accountId?this.lstAccount.find(x=>x.id==order.accountId).accountName:"",

          // Admin 
          adminId: order.adminId,
          adminName: this.lstAdmin.find(x=>x.id==order.adminId).name, 

          // Thời gian
          createdTime: order.createdTime, 
          createdTimeString: this.cmsTimeService.unixToHumanDateAndHour(order.createdTime),

          clientId: order.clientId, 
          clientIdString: order.clientId?('Máy ' + order.clientId.toString()):'', 
          
        }
        this.lstData.push(bigOrder);
        this.cmsHistoryService.getOrderDetail({moduleId: 9999},order.id).subscribe(res=>{
          bigOrder.details = res;
          bigOrder.totals = 0; 
          bigOrder.details.forEach(a=>{
            let cate = this.lstCategoryItem.find(n=>n.id==a.categoryItemId);
            let price = cate.unitPrice;
            a.categoryPrice = price;
            a.categoryItemName = cate.categoryItemName
            bigOrder.totals += (a.amount * price); 
            this.total += bigOrder.totals;
          })
          bigOrder.totalsString = this.currencyFormat(bigOrder.details);
          
        })


      })
     
    })
  }

  // Dblcick
  viewmode(e: BigOrderModel) {
    console.log(e);
    this.popup.open(CMSPopupDetailOrderComponent, e);
  }


  configTable = {
    columns: [
      {
        title: "Mã đơn",
        value: "id",
        isShow: true
      },
      {
        title: "Admin",
        value: "adminName",
        isShow: true
      },
      {
        title: "Tài khoản",
        value: "accountName",
        isShow: true
      },
       {
        title: "Máy trạm",
        value: "clientIdString",
        isShow: true
      },
      {
        title: "Thời gian",
        value: "createdTimeString",
        isShow: true
      },
      {
        title: "Tổng tiền",
        value: "totals",
        isShow: true
      }
    ],

    eventTable: []
  }

  // format tiền 
  currencyFormat(no) {
    var ar = +(no).toFixed(2).split('.');
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



