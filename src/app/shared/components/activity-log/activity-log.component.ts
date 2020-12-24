import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { EnumStaticContent } from 'src/app/common/config/statics';
import { EnumModule } from 'src/app/common/constants/global/Enums';

declare let $;
@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {
  @Output() addnote = new EventEmitter<any>();
  @Input() data: any[];
  lstFIle = [];
  message: string;
  mainImage: any;
  constructor() { }

  ngOnInit() {
    
  }
  ngOnChanges(changes: SimpleChanges) {
    
  }
  addNote() {
    this.addnote.emit(this.message);
    this.message = '';
  }
}
