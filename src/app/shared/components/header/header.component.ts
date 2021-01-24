import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SessionService } from 'src/app/core/services/base/session.service';
import { Router } from '@angular/router';
import { PageTitleService } from './../../../core/services/base/page-title.service';
import { EnumModule } from 'src/app/common/constants/global/Enums';
import { sortBy, cloneDeep } from 'lodash';
import { BusinessInfoService } from 'src/app/core/services/system/businessInfo.service';
import { Store, select } from '@ngrx/store';
import { MenuOutputModel, BusinessInfo } from 'src/app/core/models/system/businessinfo.model';
import { Module, RolePermission } from 'src/app/core/models/system/role.model';
import { UserOutput } from 'src/app/core/models/system/user.model';
import { PopupService } from '../../services/popup.service';
import { ListErrorComponent } from '../popup-detail-error/list-error/list-error.component';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { ApiEndpoint, SignalREndpoint } from 'src/app/core/models/base/CMSSession.model';
import { ToastrService } from 'ngx-toastr';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr'
import { PopupCountService } from '../../services/popupCount.service';
import { CMSSignalRService } from 'src/app/cms/cmsServices/signalR.service';
import { CMSNewMessengerModel, CMSChatModel, chat_storage_key, CMSAdminToAdminMessengerModel } from 'src/app/cms/cmsModel/chat.model';
import { storage } from 'src/app/common/helpers/storage';
import { CMSTimeService } from 'src/app/cms/cmsServices/cms-time.service';
import { CMSCategoryOrderSubject, CMSCategoryModel, CMSOrderModel, order_storage_key } from 'src/app/cms/cmsModel/order.model';


declare let $;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild('inputSearch', { static: false }) inputSearch: ElementRef;
  EnumModule = EnumModule;
  uri: MenuOutputModel;
  label: MenuOutputModel;
  lstPage: MenuOutputModel[];
  curentPermission: Module;
  lstPermission: RolePermission[];
  lstFather: MenuOutputModel[];
  recursiveList: any;
  searchList = [];
  isActive = false;
  isExpand = false;
  keyword = '';
  logo = null;
  avatar = null;
  Company = null;
  user: UserOutput;
  nameSplit = null;
  constructor(
    private sessionService: SessionService,
    private router: Router,
    private _pagetitle: PageTitleService,
    private businessInfoService: BusinessInfoService,
    private infoCompany: Store<{ infoCompany: BusinessInfo }>,
    private logoCompany: Store<{ logoCompany: string }>,
    private menuInfo: Store<{ menuInfo: any }>,
    private popup: PopupService,
    private toast: ToastrService,
    private cmsSessionService: CMSSessionService,
    private cmsSignalRService: CMSSignalRService,
    private cmsTimeService: CMSTimeService
  ) { }

  ngOnInit() {
    this.subcribe();
  }

  transferMenu(data) {
    const $this = this;
    this.lstPage = cloneDeep(data);
    this.lstPage = sortBy(this.lstPage, ['sortOrder']);
    this.lstFather = this.lstPage.filter(x => x.parentId === 0);


    let menu = this.lstFather.filter(x => x.url === this.router.url.toString())[0];
    menu === undefined ? menu = this.lstFather.find(x => x.url.replace('/', '').replace('/', '') === this.router.url.toString().split('/')[1]) : menu = menu;
    menu === undefined ? menu = this.lstFather[0] : menu = menu;

    this.recursiveList = this.lstPage.filter(x => x.parentId === menu.menuId || x.menuName.includes('(Admin)'));

    this.recursiveList.forEach(item => {
      this.getTreeMenu(item, 1);
    });

    this.label = menu;
    this._pagetitle.GenerateTitle({
      title: 'VERP - ' + menu.menuName
    });
  }


  getTreeMenu(node: any, level: number) {

    // xử lý với trường param
    (node.param && node.param !== undefined) ?
      node.param = this.parseJson(node.param.toString().replace(/'/g, '"')) :
      node.param = node.param;

    // ghi lại level của menu;
    node.level = level;
    level++;
    // quyền show của node menu
    // quyền show của node menu
    const selecPermission = this.lstPermission.find(z => z.moduleId === node.moduleId && (!node.objectTypeId || node.objectTypeId == z.objectTypeId && node.objectId == z.objectId));
    if (!node.moduleId || selecPermission) {
      node.isShow = true;
    } else {
      node.isShow = false;
    }

    node.child = this.lstPage.filter(item => item.parentId === node.menuId);
    if (node.child.length > 0) {
      node.child.forEach(item => {
        this.getTreeMenu(item, level)
      })
    }

    if (node.child && node.child.length) {

      node.child = node.child.filter(c => c.isShow);

      if (node.child && node.child.length) {
        node.isShow = true;
      } else {
        node.isShow = false;
      }
    } else {
      if (!node.url || node.url.length < 4)
        node.isShow = false;
    }

    if (node.isDisabled) {
      node.isShow = false;
    }
  }

  showSearch() {
    if (this.isActive && this.searchList.length === 0) {
      this.searchList = [];
      this.lstPage.forEach(x => {
        if (x.url.length > 3) {
          const selecPermission = this.lstPermission.filter(z => z.moduleId === x.moduleId);
          if (selecPermission.length > 0 || x.moduleId === 0) {
            let par = cloneDeep(x.param);
            (par && par !== undefined && typeof par !== 'object') ? par = this.parseJson(par.toString().replace(/'/g, '"')) : par = par;
            x.param = par;
            this.searchList.push(x);
          }
        }
      });
    }
    setTimeout(() => {
      this.inputSearch.nativeElement.focus();
    }, 300);
  }


  loadbussiness() {
    this.businessInfoService.getInfo({ moduleId: EnumModule.Me }).subscribe(r2 => {
      if (r2) {
        this.Company = r2;

        this.getAvartar(r2.logoFileId);
      }
    });
  }

  getAvartar(id) {
    if (id) {

    }
  }

  parseJson(obj) {
    try {
      JSON.parse(obj);
    } catch (e) {
      return false;
    }
    return JSON.parse(obj);
  }
  loguot() {
    this.sessionService.clear();
    this.cmsSessionService.clearStorage();
    this.router.navigateByUrl('logins');
  }

  // Khởi tạo subcribe các item đến từ signalR Service
  subcribe() {
    // Nhận tin nhắn từ Client
    this.cmsSignalRService.signalRMessageSubject.subscribe(res => {
      if (!this.router.url.includes("cms/chat")) {
        this.addNewMessage(res);
      }
      this.toast.success(res.accountName + " : " + res.message, "Máy " + res.clientId.toString()).onTap.subscribe(res => {
        this.router.navigateByUrl('cms/chat');
      });
    })

    // xóa tin nhắn trong storage khi client tắt máy. 
    this.cmsSignalRService.signalRMessageDisconnectSubject.subscribe(res => {
      var lstConversation = storage.getObject<CMSChatModel[]>(chat_storage_key);
      var disconect = lstConversation.find(item => item.connectionId = res);
      let index = lstConversation.indexOf(disconect, 0);
      if (index > -1) {
        lstConversation.splice(index, 1);
      }
      storage.setObject(chat_storage_key, lstConversation);
      console.log("Dis connect");
    })

    // Nhận tin nhắn từ Admin khác
    this.cmsSignalRService.signalRFromAnotherAdmin.subscribe(res => {
      if (!this.router.url.includes('cms/chat')) {
        this.addNewAdminMessage(res);
      }
    })

    // Order 
    this.cmsSignalRService.signalROrderSubject.subscribe(res => {
      // Nếu ở màn khác thì lưu vào storage, và bấm thì chuyển hướng, nếu đang ở màn gọi đồ thì để màn gọi đồ xử lý.
      if (this.router.url.includes('cms/order')) {
        this.toast.show("Máy: " + res.clientId, 'Yêu cầu gọi đồ');
      } else {
        this.toast.show("Máy: " + res.clientId, 'Yêu cầu gọi đồ').onTap.subscribe(tap => {
          this.router.navigateByUrl('cms/order');
        })
        // Thêm yêu cầu mới vào local storage.
        this.addNewOrderRequest(res);
      }
    })

    // Order được duyệt 
    this.cmsSignalRService.signalROrderAcceptNotify.subscribe(res => {
      if (!this.router.url.includes('cms/order')) {
        let lstOrder = storage.getObject<CMSOrderModel[]>(order_storage_key);
        if (lstOrder) {
          var orderFound = lstOrder.find(item => item.connectionId == res.connectionId);
          if (orderFound) {
            orderFound.id = res.orderId,
              orderFound.status = true,
              this.toast.success('Đã duyệt yêu cầu máy: ' + orderFound.clientId, 'Yêu cầu')
            storage.setObject(order_storage_key, lstOrder);
          }
        }
      }
    })

    // Order bị từ chối 
    this.cmsSignalRService.signalRRejectOrder.subscribe(res => {
      if (!this.router.url.includes('cms/order')) {
        let lstOrder = storage.getObject<CMSOrderModel[]>(order_storage_key);
        if (lstOrder) {
          var orderFound = lstOrder.find(item => item.connectionId == res.connectionId && item.userId == res.accountId && item.timeStamp == res.timeStamp);
          if (orderFound) {
            let index = lstOrder.indexOf(orderFound, 0);
            if (index > -1) {
              lstOrder.splice(index, 1);
            }
            this.toast.success('Đã hủy yêu cầu máy: ' + orderFound.clientId + " lúc "+ this.cmsTimeService.unixToSecondMinuteHour(res.timeStamp), 'Yêu cầu')
            storage.setObject(order_storage_key, lstOrder);
          }
        }
      }
    })
  }

  ngOnDestroy() {
    this.cmsSignalRService.hubConnection.stop();
  }

  // Thêm tin nhắn mới ( nếu không ở trang chat )
  addNewMessage(res: CMSNewMessengerModel) {
    let lstConveration = storage.getObject<CMSChatModel[]>(chat_storage_key);
    if (!lstConveration) {
      lstConveration = []
    }
    var conversationFound = lstConveration.find(x => x.connectionId == res.connectionId);
    if (conversationFound) {
      conversationFound.messages.push({
        isAdmin: false,
        message: res.message,
        timeStamp: res.timeStamp
      });
      conversationFound.isRead = false;
      conversationFound.lastMessage = res.message,
        conversationFound.lastMessageTimeStamp = res.timeStamp
    }
    else {
      lstConveration.push({
        accountName: res.accountName, clientId: res.clientId, connectionId: res.connectionId,
        isRead: false, messages: [
          {
            isAdmin: false,
            message: res.message,
            timeStamp: res.timeStamp
          }
        ],
        lastMessage: res.message,
        lastMessageTimeStamp: res.timeStamp
      })
    }
    // sort lại thứ tự chưa đọc. 
    lstConveration = this.sortListConversion(lstConveration)
    storage.setObject(chat_storage_key, lstConveration);
  }

  // Thêm tin nhắn của admin vào list 
  addNewAdminMessage(res: CMSAdminToAdminMessengerModel) {
    let lstConveration = storage.getObject<CMSChatModel[]>(chat_storage_key);
    if (!lstConveration) {
      lstConveration = []
    }
    var conversationFound = lstConveration.find(x => x.connectionId == res.connectionId);
    if (conversationFound) {
      conversationFound.messages.push({
        isAdmin: true,
        message: res.message,
        timeStamp: res.timeStamp,
        adminName: res.adminName
      });
      conversationFound.isRead = false;
      conversationFound.lastMessage = res.message,
        conversationFound.lastMessageTimeStamp = res.timeStamp
    }
    else {
    }
    storage.setObject(chat_storage_key, lstConveration);
  }

  // sắp xếp lại cuộc hội thoại
  sortListConversion(convs: CMSChatModel[]) {
    return convs.sort((x, y) => {
      // true value first
      return (!x.isRead === !y.isRead) ? 0 : x ? -1 : 1
    });
  }

  // Thêm mới categoryOrder vào storage. 
  addNewOrderRequest(res: CMSCategoryOrderSubject) {
    let listOrder = storage.getObject<CMSOrderModel[]>(order_storage_key);
    if (!listOrder) {
      listOrder = []
    }
    listOrder.push({
      adminName: this.cmsSessionService.getCMSSession().name,
      adminId: this.cmsSessionService.getCMSSession().adminId,
      clientId: res.clientId,
      clientNumber: 0,
      connectionId: res.connectionId,
      id: 0,
      timeStamp: res.timeStamp,
      listCategory: JSON.parse(res.listCategory) as CMSCategoryModel[],
      userId: 0,
      userName: res.accountName,
      status: false
    })
    storage.setObject(order_storage_key, listOrder);
  }
}

