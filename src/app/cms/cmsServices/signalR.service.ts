import { OnInit, OnChanges, Renderer2, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HubConnection, HubConnectionBuilder, HubConnectionState} from '@microsoft/signalr';
import { SignalREndpoint } from 'src/app/core/models/base/CMSSession.model';
import { CMSNewMessengerModel } from '../cmsModel/chat.model';
@Injectable({
    providedIn: 'root'
})
export class CMSSignalRService {
    hubConnection: HubConnection; 
    constructor() {
        this.initialize(); 
    }
    initialize(){
        this.hubConnection = new HubConnectionBuilder().
            withAutomaticReconnect().
            withUrl(SignalREndpoint).
            build(); 
        this.hubConnection.on('fromClient', (mess, accountName, connectionId, clientId)=>{
          this.signalRMessageSubject.next({
              accountName: accountName, 
              clientId: clientId, 
              connectionId: connectionId, 
              message: mess
          })  
        })

        this.hubConnection.start().catch(()=>{
            this.hubConnection.start(); 
        })
    }
    
    signalRMessageSubject = new Subject<CMSNewMessengerModel>(); 

}

