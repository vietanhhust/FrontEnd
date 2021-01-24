import { Component, OnInit, OnDestroy } from '@angular/core';
import { PopupCountService } from 'src/app/shared/services/popupCount.service';
import { Subscription } from 'rxjs';
import { CMSSignalRService } from '../cmsServices/signalR.service';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { ToastrService } from 'ngx-toastr';
import { PopupService } from 'src/app/shared/services/popup.service';
import { Router } from '@angular/router';
import { CMSBaseComponent } from 'src/app/core/models/base/CMSBase.component';
import { CSMEnumModule } from 'src/app/common/constants/global/CSMEnumModule';
import { EnumAction } from 'src/app/common/constants/global/Enums';
import { storage } from 'src/app/common/helpers/storage';
import { CMSMessageModel, CMSChatModel, chat_storage_key, CMSNewMessengerModel, CMSAdminToAdminMessengerModel } from '../cmsModel/chat.model';
import { CMSDashboardService } from '../cmsServices/cms-dashboard.service';
import { CMSTimeService } from '../cmsServices/cms-time.service';

@Component({
  selector: 'app-cms-chat',
  templateUrl: './cms-chat.component.html',
  styleUrls: ['./cms-chat.component.scss']
})
export class CMSChatComponent extends CMSBaseComponent implements OnInit, OnDestroy {

  // Sẽ có 2 biến list, 1 là của list các cuộc hội thoại, 2 là của list tin nhắn của các hội thoại đó. 
  lstConveration: CMSChatModel[] = [];
  lstMessage: CMSMessageModel[] = [];
  currentConversation: CMSChatModel = {
    messages: []
  }


  constructor(public cmsSignalRService: CMSSignalRService, public cmsSessionSerivce: CMSSessionService,
    public toast: ToastrService, public popup: PopupService, public router: Router,
    private cmsDashboardService: CMSDashboardService,
    private cmsTimeService: CMSTimeService
  ) {
    super(CSMEnumModule.ChatView, EnumAction.View, router, cmsSessionSerivce);
  }

  // Khởi tạo subcribe signalR để nhận tin nhắn và sự kiện disconnect. 
  signalRInitiailize() {
    this.lstConveration = storage.getObject<CMSChatModel[]>(chat_storage_key);
    if (!this.lstConveration) {
      this.lstConveration = [];
    }
    this.lstConveration = this.sortListConversion();

    // Khi tin nhắn mới đến từ client
    this.messSubcription = this.cmsSignalRService.signalRMessageSubject.subscribe(res => {
      this.newMessengerAdd(res);
      console.log(res);
    });

    // Khi client disconnect, thì xóa tin nhắn đi.
    this.disconnectSubcription = this.cmsSignalRService.signalRMessageDisconnectSubject.subscribe(res => {
      var disconect = this.lstConveration.find(item => item.connectionId = res);
      let index = this.lstConveration.indexOf(disconect, 0);
      if (index > -1) {
        this.lstConveration.splice(index, 1);
      }
      if (this.currentConversation === disconect) {
        this.currentConversation = {}
        this.lstMessage = []
      }
    })

    // Khi nhận tin nhắn mới từ admin khác. 
    this.adminMessSubcription = this.cmsSignalRService.signalRFromAnotherAdmin.subscribe(res => {
      console.clear();
      console.log("Nhận được từ admin khác");
      console.log(res);
      this.newOtherAdminMessenger(res);
    })
  }

  // Xử lý khi nhận tin nhắn mới
  newMessengerAdd(res: CMSNewMessengerModel) {
    var conversationFound = this.lstConveration.find(x => x.connectionId == res.connectionId);
    if (conversationFound) {
      conversationFound.messages.push({
        isAdmin: false,
        message: res.message,
        timeStamp: res.timeStamp
      });
      if (this.currentConversation.connectionId !== res.connectionId) {
        conversationFound.isRead = false;
      }
      conversationFound.lastMessage = res.message,
        conversationFound.lastMessageTimeStamp = res.timeStamp
    }
    else {
      this.lstConveration.push({
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
    if (this.currentConversation !== conversationFound) {
      this.lstConveration = this.sortListConversion();
    }
    storage.setObject(chat_storage_key, this.lstConveration);
    setTimeout(() => {
      let objDiv = document.getElementById("messcontainerScroll");
      objDiv.scrollTop = objDiv.scrollHeight;
    })
  }

  // Xử lý khi nhận tin nhắn của admin khác
  newOtherAdminMessenger(res: CMSAdminToAdminMessengerModel) {
    let conversationFound = this.lstConveration.find(conv => conv.connectionId == res.connectionId);
    conversationFound.messages.push({
      adminName: res.adminName,
      isAdmin: true,
      message: res.message,
      timeStamp: res.timeStamp
    });
    conversationFound.lastMessage = res.message,
      conversationFound.lastMessageTimeStamp = res.timeStamp;

    // lưu lại trạng thái vào local storage. 
    storage.setObject(chat_storage_key, this.lstConveration);
    if (this.currentConversation.connectionId == res.connectionId) {
      this.currentConversation = conversationFound;
    }
    setTimeout(() => {
      let objDiv = document.getElementById("messcontainerScroll");
      objDiv.scrollTop = objDiv.scrollHeight + 30;
    })
  }

  // Sắp xếp những cuộc hội thoại chưa đọc lên đầu.
  sortListConversion() {
    return this.lstConveration.sort((x, y) => {
      // true value first
      return (!x.isRead === !y.isRead) ? 0 : x ? -1 : 1
    });
  }

  // Click chọn hội thoại
  convClick(item: CMSChatModel) {
    this.currentConversation = item;
    item.isRead = true;
    //this.lstConveration = this.sortListConversion(); 
    this.lstMessage = this.currentConversation.messages;
    storage.setObject(chat_storage_key, this.lstConveration);
    let objDiv = document.getElementById("messcontainerScroll");
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  // Xóa hết tin nhắn đi
  resetItem() {
    storage.removeItem(chat_storage_key);
    this.lstConveration = [];
    this.currentConversation = {
      messages: []
    }
    this.lstMessage = [];
  }


  // Gửi tin nhắn cho client
  sendToClient(e: any) {
    let timeStamp = this.cmsTimeService.getCurrentUnix()
    this.cmsSignalRService.hubConnection.invoke("sendToClient",
      e,
      this.currentConversation.connectionId,
      timeStamp,
      this.cmsSessionService.getCMSSession().name).
      then(() => {
        this.currentConversation.messages.push({
          isAdmin: true,
          message: e,
          timeStamp: timeStamp,
          adminName: this.cmsSessionService.getCMSSession().name
        })
        this.currentConversation.lastMessage = e;
        this.currentConversation.lastMessageTimeStamp = timeStamp;
        storage.setObject(chat_storage_key, this.lstConveration);
        setTimeout(() => {
          let objDiv = document.getElementById("messcontainerScroll");
          objDiv.scrollTop = objDiv.scrollHeight;
        })
      });
  }

  // Reset lúc khởi tạo. 
  resetMessage() {
    this.cmsDashboardService.searchGroupClient({ moduleId: CSMEnumModule.DashboardView }).subscribe(res => {
      var lstConveration = storage.getObject<CMSChatModel[]>(chat_storage_key);
      if (!lstConveration) {
        this.lstConveration = [];
        return;
      }
      let serverStatus = res;
      // Tìm những connection không tồn tại và loại bỏ.
      lstConveration.forEach(item => {
        var clientConnection = serverStatus.find(client => client.connectionId == item.connectionId);
        if (!clientConnection) {
          let index = lstConveration.indexOf(item, 0);
          if (index > -1) {
            lstConveration.splice(index, 1);
          }
        }
      })

      this.lstConveration = lstConveration;
      storage.setObject(chat_storage_key, lstConveration);
    })
  }


























  // Subcribe signarl
  messSubcription: Subscription;
  disconnectSubcription: Subscription;
  adminMessSubcription: Subscription;
  ngOnInit(): void {
    super.ngOnInit();
    this.signalRInitiailize();
    this.resetMessage();
  }

  ngOnDestroy() {
    if (this.messSubcription) {
      this.messSubcription.unsubscribe();
    }
    if (this.disconnectSubcription) {
      this.disconnectSubcription.unsubscribe();
    }
    if (this.adminMessSubcription) {
      this.adminMessSubcription.unsubscribe();
    }
  }
}
