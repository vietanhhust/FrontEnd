import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { ToastMessageService } from 'src/app/core/services/base/toastMessage.service';

@Component({
  selector: 'app-popup-detail-error',
  templateUrl: './popup-detail-error.component.html',
  styleUrls: ['./popup-detail-error.component.scss']
})
export class PopupDetailErrorComponent implements OnInit, IModalComponent {

  @Input() data: any; 
  @Output() close = new EventEmitter
  constructor(private toast: ToastMessageService) { }

  ngOnInit(): void {
  }

  copy(){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = 
    `{
        url: "${this.data.error.url}",
        type: "${this.data.error.type}", 
        content: "${this.data.error.content}", 
        time: "${this.data.error.time}"
     }`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.toast.success("Đã copy");
  }
}
