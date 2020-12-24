import { Component, OnInit, Input, Output  } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss']
})
export class ContextmenuComponent implements OnInit {
  @Input() x = 0;
  @Input() y = 0;
  @Input() value: any;
  @Input() lstEvent: any;
  @Input() Permission: any;
  // @Output('clickEvent') clickEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.lstEvent.filter((x) => {
      if (x.type === 'edit') {
        x.isShow = this.Permission.isUpdate;
      }
      if (x.type === 'del') {
        x.isShow = this.Permission.isDelete;
      }
      if (x.type === 'cen') {
        x.isShow = this.Permission.isCensor;
      }
    });
   // console.log(this.lstEvent)
  }
}
