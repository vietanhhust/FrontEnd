import { OnInit, OnChanges, Renderer2, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';
import { SignalREndpoint } from 'src/app/core/models/base/CMSSession.model';
import { CMSNewMessengerModel, CMSAdminToAdminMessengerModel } from '../cmsModel/chat.model';
import { CMSSessionService } from 'src/app/core/services/base/CMSsession.service';
import { CMSCategoryOrderSubject } from '../cmsModel/order.model';
@Injectable({
    providedIn: 'root'
})
export class CMSSignalRService {
    hubConnection: HubConnection; 
    constructor(private cmsSessionService: CMSSessionService) {
        this.initialize(); 
    }
    initialize(){
        this.hubConnection = new HubConnectionBuilder().
            withAutomaticReconnect().   
            withUrl(SignalREndpoint).
            build(); 
        this.hubConnection.on('fromClient', (mess, accountName, connectionId, clientId, timeStamp)=>{
          this.signalRMessageSubject.next({
              accountName: accountName, 
              clientId: clientId, 
              connectionId: connectionId, 
              message: mess, 
              timeStamp: (timeStamp as number)
          })  
        })

        // Vì mỗi khi reconnect hoặc mất kết nối thì sẽ có connection id mới, mà        
        this.hubConnection.on('removeMessenger', (connectionId: string)=>{
            this.signalRMessageDisconnectSubject.next({
                connectionId: connectionId
            })
        })

        // Subject lắng nghe tin nhắn đẩy tin nhắn đến Admin khác. 
        this.hubConnection.on("adminToAdmin", (mess: string, timeStamp: number, adminName: string, connectionId: string)=>{
            console.log('admin to admin được gọi'); 
            console.log({
                adminName: adminName, 
                timeStamp: timeStamp,
                message: mess, 
                connectionId: connectionId
            });
            this.signalRFromAnotherAdmin.next({
                adminName: adminName, 
                timeStamp: timeStamp,
                message: mess, 
                connectionId: connectionId
            })
        })

        // Xử lý các order. 
        this.hubConnection.on("orderComing", (timeStamp: number, connectionId: string, clientId: number, accountName: string, lstCategory: string, accountId: number)=>{
            this.signalROrderSubject.next({
                accountName: accountName, 
                connectionId: connectionId, 
                clientId: clientId, 
                listCategory: lstCategory, 
                timeStamp: timeStamp, 
                accountId: accountId
            })
        })
        
        // Admin khác chấp thuận order
        this.hubConnection.on("acceptOrderNotifyToAdmin", (connectionId: string, orderId: number)=>{
            this.signalROrderAcceptNotify.next({
                connectionId: connectionId, 
                orderId: orderId
            })
        })

        // Admin khác hủy order
        this.hubConnection.on("rejectOrder", (connectionId: string, timeStamp: number, accountId: number)=>{
            this.signalRRejectOrder.next({
                connectionId: connectionId, 
                accountId: accountId, 
                timeStamp: timeStamp
            })
        })



        this.hubConnection.start().catch(()=>{
            this.hubConnection.start(); 
        })
    }
    
    // Phần này dành cho việc chat. 
    signalRMessageSubject = new Subject<CMSNewMessengerModel>(); 
    signalRMessageDisconnectSubject = new Subject<any>(); 
    signalRFromAnotherAdmin = new Subject<CMSAdminToAdminMessengerModel>(); 

    // Phần này dành cho việc gọi đồ
    signalROrderSubject = new Subject<CMSCategoryOrderSubject>(); 
    // Khi một yêu cầu được duyệt
    signalROrderAcceptNotify = new Subject<{
        connectionId: string, 
        orderId: number
    }>(); 

    // Khi một admin từ chối một đơn một đơn 
    signalRRejectOrder = new Subject<{
        connectionId?: string, 
        accountId?: number, 
        timeStamp?: number
    }>()
}

