import { Component, OnInit, OnDestroy } from '@angular/core';
import { CMSBaseComponent } from 'src/app/core/models/base/CMSBase.component';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { EnumAction } from 'src/app/common/constants/global/Enums';
import { Router } from '@angular/router';
import { CMSSignalRService } from '../cmsServices/signalR.service';
import { CMSTimeService } from '../cmsServices/cms-time.service';
import { Subscription } from 'rxjs';
import { CMSOrderModel, CMSCategoryOrderSubject, order_storage_key, CMSCategoryModel, CMSOrderCreating } from '../cmsModel/order.model';
import { storage } from 'src/app/common/helpers/storage';
import { CMSOrderService } from '../cmsServices/cms-order.service';
import { ToastrService } from 'ngx-toastr';
import { PopupService } from 'src/app/shared/services/popup.service';
import { CMSOrderIncurredComponent } from './cms-order-incurred/cms-order-incurred.component';
import { id } from 'date-fns/locale';
import { CMSOrderPutComponent } from './cms-order-put/cms-order-put.component';

@Component({
  selector: 'app-cms-order',
  templateUrl: './cms-order.component.html',
  styleUrls: ['./cms-order.component.scss']
})
export class CMSOrderComponent extends CMSBaseComponent implements OnInit, OnDestroy {


  lstOrder: CMSOrderModel[] = [];
  currentOrder: CMSOrderModel = {}

  constructor(public cmsSessionService: CMSSessionService, public router: Router,
    public cmsSignalRService: CMSSignalRService, public cmsTimeService: CMSTimeService,
    public cmsOrderService: CMSOrderService, public toast: ToastrService, public popup: PopupService
  ) {
    super(CSMEnumModule.OrderView, EnumAction.View, router, cmsSessionService);

  }

  ngOnInit(): void {
    super.ngOnInit();
    // Khởi tạo SignalRorder. 
    this.signalRInitialize();
    // Reset lại list order. 
    this.loadOrderRequest();
  }


  // Khởi tạo signalR
  signalRInitialize() {
    // Nhận một order mới. 
    this.orderCommingSubcribe = this.cmsSignalRService.signalROrderSubject.subscribe(res => {
      this.addNewRequest(res);
    })

    this.orderDisconnectSubcribe = this.cmsSignalRService.signalRMessageDisconnectSubject.subscribe(res => {
      //this.removeDisconnect(res);
      console.log(res);
    })

    this.orderAcceptNotify = this.cmsSignalRService.signalROrderAcceptNotify.subscribe(res => {
      this.orderAcceptNotifyByOtherAdmin(res);
    })

    this.orderRejectedSubcribe = this.cmsSignalRService.signalRRejectOrder.subscribe(res => {
      this.otherAdminRejectOrder(res);
      console.log(res);
    })

    this.orderIncurredSubcribe = this.cmsSignalRService.signalRCreateIncurredOrder.subscribe(res => {
      this.otherAdminAddIncurredOrder(res);
    })
  }

  // Thêm mới một yêu cầu đặt
  addNewRequest(res: CMSCategoryOrderSubject) {
    let lstOrder = storage.getObject<CMSOrderModel[]>(order_storage_key);
    lstOrder = lstOrder ? lstOrder : []

    lstOrder.push({
      adminName: this.cmsSessionService.getCMSSession().name,
      adminId: this.cmsSessionService.getCMSSession().adminId,
      clientId: res.clientId,
      clientNumber: 0,
      connectionId: res.connectionId,
      id: 0,
      timeStamp: res.timeStamp,
      listCategory: JSON.parse(res.listCategory) as CMSCategoryModel[],
      userId: res.accountId,
      userName: res.accountName,
      status: false,
    })

    storage.setObject(order_storage_key, lstOrder);
    this.lstOrder = lstOrder.reverse();
  }

  // Loại bỏ kết nối bị mất. 
  removeDisconnect(res: any) {
    let disconect = this.lstOrder.find(item => item.connectionId == res);
    let index = this.lstOrder.indexOf(disconect, 0);
    if (index > -1) {
      this.lstOrder.splice(index, 1);
    }
    storage.setObject(order_storage_key, this.lstOrder);
  }

  // Khi một admin khác accept một order
  orderAcceptNotifyByOtherAdmin(res: { connectionId: string, orderId: number }) {
    console.log(this.lstOrder);
    let orderFound = this.lstOrder.find(x => x.connectionId == res.connectionId);
    orderFound.id = res.orderId;
    orderFound.status = true;
    this.toast.success("Đã duyệt yêu cầu máy: " + res.orderId);
    storage.setObject(order_storage_key, this.lstOrder.reverse());
  }


  // Load các order request ra. 
  loadOrderRequest() {
    this.lstOrder = storage.getObject<CMSOrderModel[]>(order_storage_key).reverse();
    this.lstOrder = this.lstOrder ? this.lstOrder : [];

    // Loại bỏ các yêu cầu của ngày hôm trước.
    this.lstOrder.forEach(item => {
      if ((this.cmsTimeService.getCurrentUnix() - item.timeStamp) > 86400) {
        let index = this.lstOrder.indexOf(item, 0);
        if (index > -1) {
          this.lstOrder.splice(index, 1);
        }
      }


    })
  }

  // Khi admin khác tự tạo một yêu cầu mới. 
  otherAdminAddIncurredOrder(res: {
    adminId?: number,
    clientId?: number,
    timeStamps?: number,
    orderDetail?: string,
    accountId?: number,
    adminName?: string,
    accountName?: string,
    id?: number
  }) {
    if (!(this.lstOrder.length > 0)) {
      this.lstOrder = []
    }

    this.lstOrder.reverse().push({
      adminName: res.adminName,
      adminId: res.adminId,
      clientId: res.clientId,
      clientNumber: 0,
      connectionId: '',
      id: res.id,
      timeStamp: res.timeStamps,
      listCategory: JSON.parse(res.orderDetail) as CMSCategoryModel[],
      userId: res.accountId,
      userName: res.accountName,
      status: true,
      incurred: true
    })
    storage.setObject(order_storage_key, this.lstOrder);
    this.lstOrder = this.lstOrder.reverse();
  }


  resetItem() {
    this.lstOrder = [];
    storage.setObject(order_storage_key, []);
  }

  // Biến tổng tiền mỗi hóa đơn. 
  totalCost: number = 0;
  orderClick(e: CMSOrderModel) {
    this.totalCost = 0;
    this.currentOrder = e;
    this.lstOrder.forEach(item => {
      item.clicked = false;
    })
    e.clicked = true;
    e.listCategory.forEach(item => {
      this.totalCost += (item.UnitPrice as number) * (item.Quantity)
    })
    console.log(JSON.stringify(e.listCategory));
  }



  // Các nút xử lý 
  acceptOrder() {
    this.cmsOrderService.acceptOrder({ moduleId: CSMEnumModule.AcceptOrder }, {
      AdminId: this.cmsSessionService.getCMSSession().adminId,
      ClientId: this.currentOrder.clientId,
      CreatedTime: this.currentOrder.timeStamp,
      accountId: this.currentOrder.userId,
      ListCategory: this.currentOrder.listCategory
    }).subscribe(res => {
      this.currentOrder.id = res;
      this.currentOrder.status = true;
      storage.setObject(order_storage_key, this.lstOrder);
      this.toast.success('Duyệt yêu cầu thành công');
      this.cmsSignalRService.hubConnection.invoke("acceptOrderNotifyToAdmin", this.currentOrder.connectionId, this.currentOrder.id).
        then(() => { }).
        catch((e) => { console.clear() })
    })
  }


  // Hủy yêu cầu hiện tại
  rejectOrder() {
    this.popup.confirm('Bạn có muốn hủy yêu cầu gọi đồ từ máy ' + this.currentOrder.clientId, 'Hủy yêu cầu').subscribe(res => {
      if (res) {
        let connectionId = this.currentOrder.connectionId;
        let index = this.lstOrder.indexOf(this.currentOrder, 0);
        if (index > -1) {
          this.lstOrder.splice(index, 1);
          storage.setObject(order_storage_key, this.lstOrder);
          this.toast.success("Đã hủy yêu cầu");
          this.cmsSignalRService.hubConnection.invoke('rejectOrder', connectionId, this.currentOrder.timeStamp, this.currentOrder.userId);
          this.currentOrder = {};

        }

      }

    })
  }

  // Chỉnh sửa yêu cầu
  putOrders(){
    this.popup.open(CMSOrderPutComponent, this.currentOrder.listCategory, (res: CMSCategoryModel[])=>{
      this.currentOrder.listCategory = res;
      this.totalCost = 0; 
      this.currentOrder.listCategory.forEach(item=>{
        this.totalCost += item.Quantity * item.UnitPrice;
      })
    })
  }


  // Hủy đơn đặt hàng hiện tại ( từ admin khác)

  otherAdminRejectOrder(res: {
    connectionId?: string,
    accountId?: number,
    timeStamp?: number
  }) {
    if (this.lstOrder.length > 0) {
      var orderFound = this.lstOrder.find(item => item.connectionId == res.connectionId && item.userId == res.accountId && item.timeStamp == res.timeStamp);
      if (orderFound) {
        let index = this.lstOrder.indexOf(orderFound, 0);
        if (index > -1) {
          this.lstOrder.splice(index, 1);
        }
        this.toast.success('Đã hủy yêu cầu máy: ' + orderFound.clientId + " lúc " + this.cmsTimeService.unixToSecondMinuteHour(res.timeStamp), 'Yêu cầu')
        storage.setObject(order_storage_key, this.lstOrder);
        if (this.currentOrder.timeStamp == res.timeStamp && this.currentOrder.userId == res.accountId && this.currentOrder.connectionId == res.connectionId) {
          this.currentOrder = {}
        }
      }
    }
  }




  // Tạo yêu cầu phát sinh
  addIncurredOrder() {
    this.popup.open(CMSOrderIncurredComponent, {}, (res: {
      id?: number,
      model?: CMSOrderCreating,
      accountName?: string,
      clientId: number
    }) => {
      console.clear(); 
      console.log(res);
      if (res) {
        this.lstOrder.reverse().push({
          id: res.id,
          adminId: this.cmsSessionService.getCMSSession().adminId,
          adminName: this.cmsSessionService.getCMSSession().name,
          clientId: res.model.ClientId,
          clientNumber: res.clientId,
          connectionId: '',
          incurred: true,
          listCategory: res.model.ListCategory,
          status: true,
          timeStamp: res.model.CreatedTime,
          userId: res.model.accountId,
          userName: res.accountName
        })

        this.toast.success("Tạo yêu cầu mới thành công");
        this.cmsSignalRService.hubConnection.invoke("createIncurredOrders", 
          res.model.AdminId, this.cmsSessionService.getCMSSession().name,
          res.model.CreatedTime as number, JSON.stringify(res.model.ListCategory), 
          res.clientId as number, 
          res.model.accountId as number, res.accountName, res.id as number
        )
        storage.setObject(order_storage_key, this.lstOrder);
        this.lstOrder = this.lstOrder.reverse();
      }


    });

  }










  orderCommingSubcribe: Subscription;
  orderAcceptNotify: Subscription;
  orderDisconnectSubcribe: Subscription;
  orderRejectedSubcribe: Subscription;
  orderIncurredSubcribe: Subscription;
  ngOnDestroy() {
    if (this.orderCommingSubcribe) {
      this.orderCommingSubcribe.unsubscribe();
    }
    if (this.orderDisconnectSubcribe) {
      this.orderDisconnectSubcribe.unsubscribe();
    }
    if (this.orderAcceptNotify) {
      this.orderAcceptNotify.unsubscribe();
    }
    if (this.orderRejectedSubcribe) {
      this.orderRejectedSubcribe.unsubscribe();
    }
    if (this.orderIncurredSubcribe) {
      this.orderIncurredSubcribe.unsubscribe();
    }
  }
}
