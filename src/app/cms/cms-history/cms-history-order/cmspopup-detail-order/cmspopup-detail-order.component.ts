import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IModalComponent } from 'src/app/core/models/base/IModalComponent';
import { BigOrderModel } from 'src/app/cms/cmsModel/history.model';
import { CMSTimeService } from 'src/app/cms/cmsServices/cms-time.service';

@Component({
  selector: 'app-cmspopup-detail-order',
  templateUrl: './cmspopup-detail-order.component.html',
  styleUrls: ['./cmspopup-detail-order.component.scss']
})
export class CMSPopupDetailOrderComponent implements OnInit, IModalComponent {

  @Input() data: BigOrderModel; 
  @Output() close = new EventEmitter(); 
  constructor(private cmsTimeService: CMSTimeService) { }

  ngOnInit(): void {

  }

}
