import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { CMSSignalRService } from '../../cmsServices/signalR.service';
import { Subscription } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

declare let $: any; 
@Component({
  selector: 'app-cms-capture',
  templateUrl: './cms-capture.component.html',
  styleUrls: ['./cms-capture.component.scss']
})
export class CMSCaptureComponent implements OnInit, IModalComponent, OnDestroy {

  @Input() data; 
  @Output() close = new EventEmitter(); 
  constructor(private cmsSignalRService: CMSSignalRService, private domSanitizer: DomSanitizer) { }

  src; 
  ngOnInit(): void {
    this.cmsSignalRService.signalRImageCapture.subscribe(e=>{
      this.src = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + e);
    })
    this.getImage(); 
  }

  getImage(){
    this.cmsSignalRService.hubConnection.invoke("captureImage", this.data.connectionId);
  }

  subcriber: Subscription
  ngOnDestroy(){

  }
}

