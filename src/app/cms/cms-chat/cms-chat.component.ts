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
import { CMSMessageModel, CMSChatModel, chat_storage_key, CMSNewMessengerModel } from '../cmsModel/chat.model';

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
    public toast: ToastrService, public popup: PopupService, public router: Router
  ) {
    super(CSMEnumModule.ChatView, EnumAction.View, router, cmsSessionSerivce);
  }

  signalRInitiailize() {
    this.lstConveration = storage.getObject<CMSChatModel[]>(chat_storage_key);
    if(!this.lstConveration){
      this.lstConveration = [];
    }
    this.lstConveration = this.sortListConversion(); 

    this.subcribtion = this.cmsSignalRService.signalRMessageSubject.subscribe(res => {
      this.newMessengerAdd(res);
    });
  }

  // Xử lý khi nhận tin nhắn mới
  newMessengerAdd(res: CMSNewMessengerModel){
    // if(res.connectionId==this.currentConversation.connectionId){
    //   this.lstMessage.push({
    //     isAdmin: false, 
    //     message: res.message
    //   })
    // }
    var conversationFound = this.lstConveration.find(x=>x.connectionId==res.connectionId); 
    if(conversationFound){
      conversationFound.messages.push({
        isAdmin: false,
        message: res.message
      });
      conversationFound.isRead = false;
    }
    else{
      this.lstConveration.push({
        accountName: res.accountName, clientId: res.clientId, connectionId: res.connectionId, 
        isRead: false, messages: [
          {
            isAdmin: false, 
            message: res.message
          }
        ]
      })
    }
    this.lstConveration = this.sortListConversion(); 
    storage.setObject(chat_storage_key, this.lstConveration);
  }

  // Sắp xếp những cuộc hội thoại chưa đọc lên đầu.
  sortListConversion(){
    return this.lstConveration.sort((x, y) => {
      // true value first
      return (!x.isRead === !y.isRead) ? 0 : x ? -1 : 1
    });
  }


  convClick(item: CMSChatModel){
    this.currentConversation = item; 
    item.isRead = true; 
    this.lstConveration = this.sortListConversion(); 
    this.lstMessage = this.currentConversation.messages;
    storage.setObject(chat_storage_key, this.lstConveration);
  }

  resetItem(){
    storage.removeItem(chat_storage_key);
    this.lstConveration = []; 
    this.currentConversation = {
      messages: []
    }
    this.lstMessage = [];
  }


  // Gửi tin nhắn cho client
  sendToClient(e: any){
    this.cmsSignalRService.hubConnection.invoke("sendToClient", e, this.currentConversation.connectionId).then(()=>{
      this.currentConversation.messages.push({
        isAdmin: true, 
        message: e
      }); 
      storage.setObject(chat_storage_key, this.lstConveration);
    });
  
  }

























  // Subcribe signarl
  subcribtion: Subscription;
  ngOnInit(): void {
    this.signalRInitiailize(); 
  }

  ngOnDestroy() {
    if(this.subcribtion){
      this.subcribtion.unsubscribe(); 
    }
  }
}
